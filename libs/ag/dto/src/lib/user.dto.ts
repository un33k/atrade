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
 * Create request object
 */
export class UserCreateDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  email: string;

  firstName?: string;
  lastName?: string;
}

/**
 * Register request object
 */
export class UserRegisterDTO extends UserCreateDTO {
  @IsNotEmpty()
  password: string;
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
