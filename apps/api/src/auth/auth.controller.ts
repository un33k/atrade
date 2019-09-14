import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDTO, UserLoginDTO } from '@agx/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() data: UserLoginDTO) {
    return this.authService.login(data);
  }

  @Post('register')
  register(@Body() data: UserRegisterDTO) {
    return this.authService.register(data);
  }
}
