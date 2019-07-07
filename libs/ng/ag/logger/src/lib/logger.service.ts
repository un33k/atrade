import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { merge as ldNestedMerge } from 'lodash';
import { BaseLogger } from '@agx/base';
import { CfgService } from '@ngagx/cfg';

import { DefaultLogCfg } from './logger.defaults';
import { LoggerCfg } from './logger.models';

@Injectable({
  providedIn: 'root'
})
export class LoggerService extends BaseLogger {
  private initializedOptions: LoggerCfg = DefaultLogCfg;

  constructor(public cfgService: CfgService, @Inject(PLATFORM_ID) public platformId) {
    super();

    this.initializedOptions = ldNestedMerge(DefaultLogCfg, cfgService.options.logger);
    this.appLogLevel = this.initializedOptions.level;

    if (isPlatformBrowser(platformId)) {
      this.platformIsIE = !!(
        navigator.userAgent.match(/Edge\//) ||
        navigator.userAgent.match(/Trident\//) ||
        navigator.userAgent.indexOf('MSIE') !== -1
      );
    }
    if (!this.cfgService.options.production) {
      this.debug(`LogService ready ... (${platformId})`);
    }
  }

  get options() {
    return this.initializedOptions;
  }
}
