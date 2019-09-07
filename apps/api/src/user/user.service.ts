import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserLoginDTO } from '@agx/dto';
import { UserEntity } from './user.entity';
import { USER_PER_PAGE } from './user.constants';
import { environment } from '../environments/environment';

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
    return users ? users.map(user => user.toResponseDTO()) : [];
  }

  async read(username: string) {
    const user = await this.userRepository.findOne({
      where: { username }
    });

    return user ? user.toResponseDTO() : null;
  }

  async login(data: UserLoginDTO) {
    const { username, password } = data;
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException('Invalid username/password', HttpStatus.BAD_REQUEST);
    }
    return user ? user.toResponseDTO({ includeToken: true, includeEmail: true }) : null;
  }

  async register(data: UserLoginDTO) {
    const { username } = data;
    let user = await this.userRepository.findOne({ where: { username } });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    user = await this.userRepository.create(data);
    await this.userRepository.save(user);
    return user ? user.toResponseDTO({ includeToken: true, includeEmail: true }) : null;
  }

  private createAdmin() {
    this.read(environment.adminInfo.username)
      .then(admin => {
        if (!admin) {
          this.register(environment.adminInfo);
        }
      })
      .catch(err => console.log(err));
  }
}
