import { Controller, Get, Post, Put, Delete, Body, Param, UsePipes, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponseDTO, UserCreateDTO, UserUpdateDTO, UserRegisterRequestDTO } from '@agx/dto';
import { ValidationPipe } from '@nt';
import { AuthGuardAuthenticated, AuthGuardNotAuthenticated } from '../auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  showAll(): Promise<UserResponseDTO[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  read(@Param('id') id: string) {
    return this.userService.read(id);
  }

  @Post()
  @UseGuards(new AuthGuardNotAuthenticated())
  @UsePipes(new ValidationPipe())
  create(@Body() data: UserCreateDTO) {
    return this.userService.create(data);
  }

  @Put(':id')
  @UseGuards(new AuthGuardAuthenticated())
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() data: Partial<UserUpdateDTO>) {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(new AuthGuardAuthenticated())
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
