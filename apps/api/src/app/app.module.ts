import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { environment } from '../environments/environment';

@Module({
  imports: [
    // app level imports
    TypeOrmModule.forRoot({
      ...environment.ormConfig,
      entities: getMetadataArgsStorage().tables.map(tbl => tbl.target)
    }),
    UserModule
  ],
  controllers: [
    // app level controllers
    AppController
  ],
  providers: [
    // app level services
    AppService
  ]
})
export class AppModule {}
