import { TestBed } from '@angular/core/testing';

import { LogLevel } from '@agx/base';
import { CFG_OPTIONS, AppCfg, CfgModule } from '@ngagx/cfg';

import { LoggerModule } from './logger.module';
import { LoggerService } from './logger.service';

const AppEnv: AppCfg = {
  appName: '@agngx/logger',
  production: false,
  version: '1.0.1'
};

// disable console log during test
jest.spyOn(console, 'log').mockImplementation(() => undefined);

describe('LoggerService - Default Cfg', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CfgModule.forRoot(AppEnv), LoggerModule],
      providers: [{ provide: CFG_OPTIONS, useValue: AppEnv }]
    });

    service = TestBed.get(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be have the app config options', () => {
    expect(service.cfg.options.appName).toBe(AppEnv.appName);
  });

  it('should be have the module default config options', () => {
    expect(service.options.level).toBe(LogLevel.none);
  });
});

describe('LoggerService - LoggerCfg', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CfgModule.forRoot(AppEnv)],
      providers: [{ provide: CFG_OPTIONS, useValue: { ...AppEnv, logger: { level: LogLevel.error } } }]
    });

    service = TestBed.get(LoggerService);
  });

  it('should have local config match app-level config', () => {
    expect(service.options.level).toBe(service.cfg.options.logger.level);
  });
});
