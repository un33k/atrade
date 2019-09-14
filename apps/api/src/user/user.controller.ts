import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponseDTO, UserCreateDTO, UserUpdateDTO, UserRegisterDTO, UserLoginDTO } from '@agx/dto';
import { ValidationPipe } from '@nt';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  showAll(): Promise<UserResponseDTO[]> {
    return this.userService.showAll();
  }

  @Get(':id')
  read(@Param('id') id: string) {
    return this.userService.read(id);
  }

  @Post()
  create(@Body() data: UserCreateDTO) {
    return this.userService.create(data);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() data: Partial<UserUpdateDTO>) {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
