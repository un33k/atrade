import { Injectable, HttpException, HttpStatus, Inject, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { UserCreateDTO, UserResponseDTO, UserUpdateDTO } from '@agx/dto';
import { UserEntity } from './user.entity';
import { USER_PER_PAGE } from './user.constants';
import { tryGet } from '@agx/utils';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @InjectRepository(UserEntity) readonly userRepository: Repository<UserEntity>
  ) {}

  async findAll(page = 1) {
    const authUser = tryGet(() => this.request.user, {}) as UserEntity;
    const users = await this.userRepository.find({
      take: USER_PER_PAGE,
      skip: USER_PER_PAGE * (page - 1)
    });
    return tryGet(() => users.map(user => user.toResponseDTO({ includeEmail: user.id === authUser.id })), []);
  }

  async read(id: string) {
    const user = (this.request.user as UserEntity) || (await this.userRepository.findOne({ where: { id } }));
    if (!user) {
      throw new HttpException('Unknown user', HttpStatus.NOT_FOUND);
    }
    return tryGet(() => user.toResponseDTO({ includeEmail: id === user.id }));
  }

  async update(id: string, data: Partial<UserUpdateDTO>): Promise<UserResponseDTO> {
    let authUser = this.request.user as UserEntity;
    this.userRepository.merge(authUser, data);
    authUser = await this.userRepository.save(authUser);
    return tryGet(() => authUser.toResponseDTO({ includeEmail: true }));
  }

  async delete(id: string) {
    const authUser = this.request.user as UserEntity;
    await this.userRepository.remove(authUser);
    this.request.res.clearCookie('jwt');
    return { statusCode: 200, message: `User deleted (${id})` };
  }

  async create(data: UserCreateDTO) {
    const { username, email } = data;
    let user = await this.userRepository.findOne({ where: { username, email } });
    if (user) {
      throw new HttpException('User exists', HttpStatus.BAD_REQUEST);
    }
    user = await this.userRepository.create(data);
    await this.userRepository.save(user);
    return user;
  }
}
