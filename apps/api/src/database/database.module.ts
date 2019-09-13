import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';

import { environment } from '../environments/environment';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...environment.ormConfig,
      entities: getMetadataArgsStorage().tables.map(tbl => tbl.target)
    })
  ],
  providers: [DatabaseService]
})
export class DatabaseModule {}
