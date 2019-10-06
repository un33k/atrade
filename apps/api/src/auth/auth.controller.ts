import { Controller, Post, Body, UsePipes, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginRequestDTO, UserRegisterRequestDTO } from '@agx/dto';
import { ValidationPipe } from '@nt';
import { AuthGuardApi } from './auth.guard.api';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() data: UserRegisterRequestDTO) {
    return this.authService.register(data);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() data: UserLoginRequestDTO) {
    return this.authService.login(data);
  }

  @Post('refresh-token')
  @UseGuards(new AuthGuardApi())
  refreshToken() {
    return this.authService.refreshToken();
  }

  @Post('whoami')
  @UseGuards(new AuthGuardApi())
  showMe() {
    return this.authService.whoAmI();
  }
}
