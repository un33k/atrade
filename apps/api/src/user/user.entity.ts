import { tryGet } from '@agx/utils';
import {
  // typeorm
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  UpdateDateColumn,
  BeforeUpdate
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { UserResponseDTO } from '@agx/dto';

import { USER_JWT_EXPIRY } from './user.constants';
import { UserResponseOptions } from './user.types';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'text',
    unique: true
  })
  username: string;

  @Column({
    type: 'text',
    unique: true
  })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @BeforeInsert()
  async setPassword() {
    this.password = await bcrypt.hash(this.password || this.makeRandomPassword(), 10);
  }

  @BeforeUpdate()
  async setNewPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  @BeforeUpdate()
  async prune() {
    if (this.updatedAt) {
      delete this.updatedAt;
    }
    console.log(this)
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

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

  private get token(): string {
    return jwt.sign(
      {
        sub: this.id
      },
      process.env.SECRET || 'verySeekret',
      { expiresIn: `${USER_JWT_EXPIRY}d` }
    );
  }

  private makeRandomPassword(): string {
    return new Date().getMilliseconds.toString();
  }
}
