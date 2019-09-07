import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponseDTO } from '@agx/dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  showAll(): Promise<UserResponseDTO[]> {
    console.log('get all users')
    return this.userService.showAll();
  }
}
