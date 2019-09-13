import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    // app level imports
    DatabaseModule,
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
