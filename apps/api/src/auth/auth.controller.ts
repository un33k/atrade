import { Controller, Post, Body, UsePipes, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginRequestDTO, UserRegisterRequestDTO } from '@agx/dto';
import { ValidationPipe } from '@nt';
import { AuthGuardAuthenticated, AuthGuardNotAuthenticated } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseGuards(new AuthGuardNotAuthenticated())
  @UsePipes(new ValidationPipe())
  register(@Body() data: UserRegisterRequestDTO) {
    return this.authService.register(data);
  }

  @Post('login')
  @UseGuards(new AuthGuardNotAuthenticated())
  @UsePipes(new ValidationPipe())
  login(@Body() data: UserLoginRequestDTO) {
    return this.authService.login(data);
  }

  @Post('refresh-token')
  @UseGuards(new AuthGuardAuthenticated())
  refreshToken() {
    return this.authService.refreshToken();
  }

  @Post('whoami')
  @UseGuards(new AuthGuardAuthenticated())
  showMe() {
    return this.authService.whoAmI();
  }
}
