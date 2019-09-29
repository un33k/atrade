import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserCreateDTO, UserResponseDTO, UserUpdateDTO } from '@agx/dto';
import { UserEntity } from './user.entity';
import { USER_PER_PAGE } from './user.constants';
import { tryGet } from '@agx/utils';

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) readonly userRepository: Repository<UserEntity>) {}

  async findAll(page = 1) {
    const users = await this.userRepository.find({
      take: USER_PER_PAGE,
      skip: USER_PER_PAGE * (page - 1)
    });
    return tryGet(() => users.map(user => user.toResponseDTO()), []);
  }

  async read(username: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new HttpException('Unknown user', HttpStatus.NOT_FOUND);
    }
    return tryGet(() => user.toResponseDTO());
  }

  async update(id: string, data: Partial<UserUpdateDTO>): Promise<UserResponseDTO> {
    let user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('Unknown user', HttpStatus.NOT_FOUND);
    }
    this.userRepository.merge(user, data);
    user = await this.userRepository.save(user);
    return tryGet(() => user.toResponseDTO());
  }

  async delete(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('Unknown user', HttpStatus.NOT_FOUND);
    }
    await this.userRepository.remove(user);
    return { statusCode: 200, message: `User deleted (${id})` };
  }

  async create(data: UserCreateDTO) {
    const { username } = data;
    let user = await this.userRepository.findOne({ where: { username } });
    if (user) {
      throw new HttpException('User exists', HttpStatus.BAD_REQUEST);
    }
    user = await this.userRepository.create(data);
    await this.userRepository.save(user);
    return tryGet(() => user.toResponseDTO({ includeToken: true, includeEmail: true }));
  }
}
