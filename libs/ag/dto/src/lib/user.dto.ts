import { IsNotEmpty, IsEmpty } from 'class-validator';

/**
 * Login request object
 */
export class UserLoginDTO {
  username: string;

  email: string;

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
 * Update request object
 */
export class UserUpdateDTO {
  @IsEmpty()
  username: string;

  @IsEmpty()
  email: string;

  firstName?: string;
  lastName?: string;
}

/**
 * Update Email request object
 */
export class UserUpdateEmailDTO {
  @IsEmpty()
  username: string;

  @IsNotEmpty()
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
