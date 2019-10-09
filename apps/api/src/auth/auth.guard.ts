import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { tryGet } from '@agx/utils';
import { environment } from '../environments/environment';

@Injectable()
export class AuthGuardAuthenticated implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const isUserAuthenticated = !!tryGet(() => request.use.id);
    return isUserAuthenticated;
  }
}

@Injectable()
export class AuthGuardNotAuthenticated implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const isUserAuthenticated = !!tryGet(() => request.use.id);
    return !isUserAuthenticated;
  }
}
