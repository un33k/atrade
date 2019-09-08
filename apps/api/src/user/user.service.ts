import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserLoginDTO, UserRegisterDTO, StatusDTO, UserCreateDTO } from '@agx/dto';
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
    return tryGet(() => user.toResponseDTO());
  }

  async update(id: string, data: Partial<UserCreateDTO>) {
    await this.userRepository.update({ id }, data);
    const user = await this.userRepository.findOne({ id });
    return tryGet(() => user.toResponseDTO());
  }

  async delete(id: string) {
    await this.userRepository.delete({ id });
    return { operation: 'delete', success: true, message: `User deleted (${id})` } as StatusDTO;
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
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
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
