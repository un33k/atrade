import { tryGet } from '@agx/utils';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { UserResponseDTO, UserCreateDTO, UserRegisterDTO } from '@agx/dto';

import { environment } from '../environments/environment';
import { USER_JWT_EXPIRY } from './user.constants';
import { UserResponseOptions } from './user.types';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn({ type: 'timestamptz', readonly: true })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', readonly: true })
  updatedAt: Date;

  @Column({ type: 'text', unique: true })
  username: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ length: 100, nullable: true })
  firstName: string;

  @Column({ length: 100, nullable: true })
  lastName: string;

  @Column({ length: 255 })
  password: string;

  /**
   * Before the initial insert, we need to have a password
   */
  @BeforeInsert()
  async setPassword() {
    this.password = await this.bcryptPassword(this.password);
  }

  /**
   * Sets user's password to the given string (salted + bcrypted)
   * @param password password string
   */
  async setNewPassword(password: string) {
    this.password = await this.bcryptPassword(password);
  }

  /**
   * Returns true if attempted password is the same as the saved password
   * @param attempt password attempt
   */
  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(this.password, this.saltPassword(attempt));
  }

  /**
   * Enforces what can be returned to clients
   * @param options Response options
   * @warn sensetive data such as password shall not be sent to client
   */
  toResponseDTO(options?: UserResponseOptions): UserResponseDTO {
    const { id, createdAt, updatedAt, username, token, firstName, lastName } = this;
    const response: UserResponseDTO = {
      id,
      createdAt,
      updatedAt,
      username,
      firstName,
      lastName
    };

    if (tryGet(() => options.includeToken)) {
      response.token = token;
    }

    if (tryGet(() => options.includeEmail)) {
      response.email = this.email;
    }

    return response;
  }

  /**
   * Hydrates user record with given partial data
   * @param data partial user data
   */
  toModel(data: Partial<UserCreateDTO | UserRegisterDTO>) {
    for (const key of Object.keys(data)) {
      if (this.hasOwnProperty(key)) {
        this[key] = data[key];
      }
    }
    return this;
  }

  /**
   * Returns an encrypted JWT token for user for session
   */
  private get token(): string {
    return jwt.sign(
      {
        sub: this.id
      },
      environment.seekret,
      { expiresIn: `${USER_JWT_EXPIRY}d` }
    );
  }

  /**
   * Returns a salted password
   * @param password string
   * @warn changing the `salt` will invalidate all password
   */
  private saltPassword(password: string) {
    return `${password}:${environment.seekret}`;
  }

  /**
   * Returns a salted-bcrypted password
   * @param password string
   * @warn changing the `salt` will invalidate all password
   * @warn to prevent null-password attacks, no user shall be created with a null-password
   */
  private async bcryptPassword(password: string) {
    password = password || Math.random().toString();
    return await bcrypt.hash(this.saltPassword(password), 10);
  }
}
