import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponseDTO, UserRegisterDTO, UserCreateDTO } from '@agx/dto';
import { create } from 'domain';
import { read } from 'fs';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  showAll(): Promise<UserResponseDTO[]> {
    console.log('get all users');
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
  update(@Param('id') id: string, @Body() data: Partial<UserCreateDTO>) {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
