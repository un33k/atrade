import { IsNotEmpty, IsEmpty, IsString, IsEmail, IsOptional, IsNotIn } from 'class-validator';

/**
 * Create request object
 */
export class UserCreateDTO {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;
}

/**
 * Update request object
 */
export class UserUpdateDTO {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;
}

/**
 * Update Email request object
 */
export class UserUpdateEmailDTO {
  @IsEmail()
  email: string;
}

/**
 * User profile request response
 */
export class UserResponseDTO {
  id: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  email?: string;
  token?: string;
}
