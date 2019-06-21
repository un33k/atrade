import { TestBed } from '@angular/core/testing';

import { AppCfg } from './cfg.types';
import { CFG_OPTIONS } from './cfg.defaults';
import { CfgModule } from './cfg.module';
import { CfgService } from './cfg.service';

const AppEnv: AppCfg = {
  version: '1.0.1',
  production: true
};

describe('CfgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CfgModule.forRoot(AppEnv)],
      providers: [{ provide: CFG_OPTIONS, useValue: AppEnv }]
    });
  });

  it('should be created', () => {
    const service: CfgService = TestBed.get(CfgService);
    expect(service).toBeTruthy();
  });

  it('should be have the version options', () => {
    const service: CfgService = TestBed.get(CfgService);
    expect(service['options'].version).toBe('1.0.1');
  });

  it('should fallback on default local config options', () => {
    const service: CfgService = TestBed.get(CfgService);
    expect(service['options'].cfg.loginPageUrl).toBe('/auth/login');
  });

  it('should fallback on default remote config options', () => {
    const service: CfgService = TestBed.get(CfgService);
    expect(service['options'].rmtCfg.timeout).toBe(2);
  });
});
