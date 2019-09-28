import { Controller, Post, Body, UsePipes, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDTO, UserLoginDTO } from '@agx/dto';
import { ValidationPipe } from '@nt';
import { AuthGuardApi } from './auth.guard.api';
import { Token } from '../user/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() data: UserLoginDTO) {
    return this.authService.login(data);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() data: UserRegisterDTO) {
    return this.authService.register(data);
  }

  @Get('whoami')
  @UseGuards(new AuthGuardApi())
  showMe(@Token('username') username: string) {
    return this.authService.userService.read(username);
  }
}
