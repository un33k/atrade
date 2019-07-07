import { InjectionToken } from '@angular/core';
import { LogLevel } from '@agx/base';

import { LoggerCfg } from './logger.models';

/** Default configuration - logger module */
export const DefaultLogCfg: LoggerCfg = {
  level: LogLevel.none
};

/** Logger configuration options token */
export const LOGGER_OPTIONS = new InjectionToken<string>('LOGGER_OPTIONS');
