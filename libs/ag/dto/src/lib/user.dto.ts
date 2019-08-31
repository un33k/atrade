import { IsNotEmpty } from 'class-validator';

/**
 * Login request object
 */
export class UserLoginDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

/**
 * Register request object
 */
export class UserRegisterDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  firstName?: string;
  lastName?: string;
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