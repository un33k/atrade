import { AppCfg } from '@ngagx/cfg';
import { LoggerCfg } from '@ngagx/logger';
import { LogLevel } from '@agx/base';

const loggerCfg: LoggerCfg = {
  level: LogLevel.error
};

export const environment: AppCfg = {
  version: '0.0.2',
  production: true,
  logger: loggerCfg
};
