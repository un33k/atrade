import { IsString, IsEmail, IsOptional } from 'class-validator';
import { UserCreateDTO } from './user.dto';

/**
 * Login request object
 */
export class UserLoginDTO {
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

/**
 * Register request object
 */
export class UserRegisterDTO extends UserCreateDTO {
  @IsString()
  password: string;
}
