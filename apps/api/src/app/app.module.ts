import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    // app level imports
    DatabaseModule,
    UserModule,
    AuthModule
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
