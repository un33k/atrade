import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { tryGet } from '@agx/base';
import { UserResponseDTO } from '@agx/dto';

import { USER_JWT_EXPIRY } from './user.constants';
import { UserResponseOptions } from './user.model';

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

  @Column('text')
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
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
      process.env.SECRET,
      { expiresIn: `${USER_JWT_EXPIRY}d` }
    );
  }
}
