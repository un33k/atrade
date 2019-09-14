import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserLoginDTO, UserRegisterDTO, StatusDTO, UserCreateDTO, UserResponseDTO, UserUpdateDTO } from '@agx/dto';
import { UserEntity } from './user.entity';
import { USER_PER_PAGE } from './user.constants';
import { environment } from '../environments/environment';
import { tryGet } from '@agx/utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {
    this.createAdmin();
  }

  async showAll(page = 1) {
    const users = await this.userRepository.find({
      take: USER_PER_PAGE,
      skip: USER_PER_PAGE * (page - 1)
    });
    return tryGet(() => users.map(user => user.toResponseDTO()), []);
  }

  async read(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
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
    await this.userRepository.delete({ id });
    return { statusCode: 200, message: `User deleted (${id})` };
  }

  async login(data: UserLoginDTO) {
    const { username, password } = data;
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException('Invalid username/password', HttpStatus.BAD_REQUEST);
    }
    return tryGet(() => user.toResponseDTO({ includeToken: true, includeEmail: true }));
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

  async register(data: UserRegisterDTO) {
    return await this.create(data);
  }

  private createAdmin() {
    this.userRepository
      .findOne({ where: { username: environment.adminInfo.username } })
      .then(admin => {
        if (!admin) {
          this.register(environment.adminInfo);
        }
      })
      .catch(err => console.log(err));
  }
}
