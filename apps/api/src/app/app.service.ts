import { Injectable } from '@nestjs/common';
import { Message } from '@agx/dto';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
