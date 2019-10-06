/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/

import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.setGlobalPrefix(environment.domainInfo.apiPrefex);

  await app.listen(environment.domainInfo.port, () => {
    if (!environment.production) {
      console.log(`Listening at http://localhost:${environment.domainInfo.port}/${environment.domainInfo.apiPrefex}`);
    }
  });
}

bootstrap();
