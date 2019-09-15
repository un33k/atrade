import { createParamDecorator } from '@nestjs/common';
import { tryGet } from '@agx/utils';

export const Token = createParamDecorator((data, req) => {
  return tryGet(() => req.token[data], req.token);
});
