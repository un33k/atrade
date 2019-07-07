import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoggerCfg } from './logger.models';
import { LoggerService } from './logger.service';
import { LOGGER_OPTIONS } from './logger.defaults';

@NgModule({
  imports: [CommonModule, HttpClientModule]
})
export class LoggerModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: LoggerModule
  ) {
    if (parentModule) {
      throw new Error('LoggerModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(options?: LoggerCfg): ModuleWithProviders {
    return {
      ngModule: LoggerModule,
      providers: [LoggerService, { provide: LOGGER_OPTIONS, useValue: options }]
    };
  }
}
