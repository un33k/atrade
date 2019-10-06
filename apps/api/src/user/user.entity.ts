import { tryGet } from '@agx/utils';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { UserResponseDTO, UserCreateDTO, UserRegisterRequestDTO } from '@agx/dto';
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

  @Column({ type: 'int', default: 1 })
  sessionId: number;

  /**
   * Before the initial insert, we need to have a password
   */
  @BeforeInsert()
  async setPassword() {
    this.password = await this.hashPassword(this.password);
  }

  /**
   * Sets user's password to the given string (salted + bcrypted)
   * @param password password string
   */
  async setNewPassword(password: string) {
    this.password = await this.hashPassword(password);
  }

  /**
   * Returns true if attempted password is the same as the saved password
   * @param attempt password attempt
   */
  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  /**
   * Enforces what can be returned to clients
   * @param options Response options
   * @warn sensetive data such as password shall not be sent to client
   */
  toResponseDTO(options?: UserResponseOptions): UserResponseDTO {
    const { id, createdAt, updatedAt, username, firstName, lastName } = this;
    const response: UserResponseDTO = {
      id: id.toString(),
      createdAt,
      updatedAt,
      username,
      firstName,
      lastName,
      email: tryGet(() => options.includeEmail) ? this.email : null
    };

    return response;
  }

  /**
   * Hydrates user record with given partial data
   * @param data partial user data
   */
  toModel(data: Partial<UserCreateDTO | UserRegisterRequestDTO>) {
    for (const key of Object.keys(data)) {
      if (this.hasOwnProperty(key)) {
        this[key] = data[key];
      }
    }
    return this;
  }

  /**
   * Returns an a one-way hassed password
   * @param password string
   * @note to prevent null-password attacks, no user shall be created with a null-password
   */
  private async hashPassword(password: string) {
    password = password || Math.random().toString();
    return await bcrypt.hash(password, 10);
  }
}
