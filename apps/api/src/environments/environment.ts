// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SuperUser } from '../user/user.types';
import { UserRegisterDTO } from '@agx/dto';

const production = false;

const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'atrader',
  password: 'pass4atrader',
  database: 'atrader',
  synchronize: false,
  logging: true,
  entities: [production ? `${__dirname}../../../../dist/**/*.entity.js` : `${__dirname}/../**/*.entity.ts`]
};

const adminInfo: UserRegisterDTO = {
  username: 'admino',
  firstName: 'Val',
  lastName: 'Neekman',
  email: 'val@neekman.com',
  password: 'hello'
};

export const environment = {
  production,
  ormConfig,
  adminInfo
};
