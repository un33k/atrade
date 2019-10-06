import { Injectable, HttpException, HttpStatus, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import {
  UserLoginRequestDTO,
  UserLoginReponseDTO,
  UserResponseDTO,
  UserRegisterRequestDTO,
  UserRegisterReponseDTO
} from '@agx/dto';
import { UserService } from '../user/user.service';
import { makeAccessToken, makeSessionToken } from './auth.utils';
import { environment } from '../environments/environment';
import { UserEntity } from '../user/user.entity';
import { tryGet } from '@agx/utils';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(@Inject(REQUEST) private readonly request: Request, readonly userService: UserService) {
    this.createAdmin();
  }

  async register(data: UserRegisterRequestDTO): Promise<UserRegisterReponseDTO> {
    const user = await this.userService.create(data);
    return await this.returnToken(user);
  }

  async login(data: UserLoginRequestDTO): Promise<UserLoginReponseDTO> {
    const { username, email, password } = data;
    const user = await this.userService.userRepository.findOne({ where: [{ username }, { email }] });
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException('Invalid username/password', HttpStatus.BAD_REQUEST);
    }

    return await this.returnToken(user);
  }

  async refreshToken(): Promise<UserLoginReponseDTO> {
    const user = this.request.user as UserEntity;
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
    }
    return await this.returnToken(user);
  }

  async whoAmI(): Promise<UserResponseDTO> {
    const user = this.request.user as UserEntity;
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
    }
    return tryGet(() => user.toResponseDTO());
  }

  async returnToken(user: UserEntity) {
    await this.request.res.cookie('jwt', makeSessionToken(user));
    return { ok: true, accessToken: makeAccessToken(user) };
  }

  private createAdmin() {
    this.userService.userRepository
      .findOne({ where: { username: environment.adminInfo.username } })
      .then(admin => {
        if (!admin) {
          this.userService.create(environment.adminInfo);
        }
      })
      .catch(err => console.log(err));
  }
}
