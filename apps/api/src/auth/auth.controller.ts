import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDTO, UserLoginDTO } from '@agx/dto';
import { ValidationPipe } from '@nt';

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
}
