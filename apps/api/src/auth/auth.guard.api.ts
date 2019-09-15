import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { tryGet } from '@agx/utils';
import { environment } from '../environments/environment';

@Injectable()
export class AuthGuardApi implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = tryGet(() => request.headers.authorization);
    if (!authorization) {
      return false;
    }
    request.token = await this.validateToken(authorization);
    return true;
  }

  async validateToken(auth: string) {
    const token = auth.replace('Bearer ', '');
    try {
      return await jwt.verify(token, environment.seekret);
    } catch (err) {
      const message = `Token error: ${tryGet(() => err.message) || tryGet(() => err.name, '')}`;
      throw new HttpException(message, HttpStatus.UNAUTHORIZED);
    }
  }
}
