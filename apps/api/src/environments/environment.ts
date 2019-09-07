// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const isProduction = false;
const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'atrader',
  password: 'pass4atrader',
  database: 'atrader',
  synchronize: isProduction || true,
  logging: true,
  entities: ['apps/api/src/**/*.entity{.ts,.js}']
};

export const environment = {
  production: isProduction,
  ormConfig: ormConfig
};
