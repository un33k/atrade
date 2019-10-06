import { IsString, IsEmail, IsOptional, IsBoolean } from 'class-validator';
import { UserCreateDTO } from './user.dto';

/**
 * Login request object
 */
export class UserLoginRequestDTO {
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
 * Login response object
 */
export class UserLoginReponseDTO {
  @IsBoolean()
  ok: boolean;

  @IsString()
  accessToken: string;

  @IsOptional()
  @IsString()
  message?: string;
}

export class UserRegisterReponseDTO extends UserLoginReponseDTO {}

/**
 * Register request object
 */
export class UserRegisterRequestDTO extends UserCreateDTO {
  @IsString()
  password: string;
}
