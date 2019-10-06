import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NestMiddleware, HttpStatus, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { ExtractJwt } from 'passport-jwt';

import { UserService } from '../user/user.service';
import { environment } from '../environments/environment';
import { tryGet } from '@agx/utils';
import { AuthTokenPayload } from './auth.types';
import { makeSessionToken } from './auth.utils';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    if (token) {
      const payload = (await this.validateToken(token)) as AuthTokenPayload;
      const user = await this.userService.userRepository.findOne({ where: { id: payload.userId } });
      if (!user) {
        throw new HttpException('Unknown user', HttpStatus.UNAUTHORIZED);
      }

      req.user = user;
    }
    next();
  }

  async validateToken(token: string) {
    try {
      return await jwt.verify(token, environment.seekret);
    } catch (err) {
      const message = `Token error: ${tryGet(() => err.message) || tryGet(() => err.name, '')}`;
      throw new HttpException(message, HttpStatus.UNAUTHORIZED);
    }
  }
}
