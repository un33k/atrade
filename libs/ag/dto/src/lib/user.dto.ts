import { IsString, IsEmail, IsOptional, IsNotIn } from 'class-validator';
import { Field, ID, ObjectType } from 'type-graphql';

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
@ObjectType({description: 'User Response Data Transfer Object (DTO) '})
export class UserResponseDTO {
  @Field(type => ID)
  readonly id: string;
  @Field()
  readonly username: string;
  @Field({ nullable: true })
  readonly createdAt?: Date;
  @Field({ nullable: true })
  readonly updatedAt?: Date;
  @Field({ nullable: true })
  readonly firstName?: string;
  @Field({ nullable: true })
  readonly lastName?: string;
  @Field({ nullable: true })
  readonly email?: string;
  @Field({ nullable: true })
  readonly token?: string;
}
