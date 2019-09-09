// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserRegisterDTO } from '@agx/dto';

/** Whether this is a production server */
const production = false;

/**
 * Site-wide top seekret phrase.
 * @note changing this will make all password invalid
 * */
const seekret = 'hajsfASDFAFDIH:HH&Y*YE*REIHFJ:NJNDF:HDHF:DF';

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
  seekret,
  production,
  ormConfig,
  adminInfo
};
