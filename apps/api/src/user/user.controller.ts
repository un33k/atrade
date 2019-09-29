import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponseDTO, UserCreateDTO, UserUpdateDTO } from '@agx/dto';
import { ValidationPipe } from '@nt';
import { AuthGuardApi } from '../auth/auth.guard.api';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  showAll(): Promise<UserResponseDTO[]> {
    return this.userService.findAll();
  }

  @Get(':username')
  read(@Param('username') username: string) {
    return this.userService.read(username);
  }

  @Post()
  @UseGuards(new AuthGuardApi())
  @UsePipes(new ValidationPipe())
  create(@Body() data: UserCreateDTO) {
    return this.userService.create(data);
  }

  @Put(':id')
  @UseGuards(new AuthGuardApi())
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() data: Partial<UserUpdateDTO>) {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(new AuthGuardApi())
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
