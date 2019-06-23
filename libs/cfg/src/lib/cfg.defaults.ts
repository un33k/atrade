import { InjectionToken } from '@angular/core';

import { Cfg, HttpMethod, RemoteCfg, AppCfg, TargetPlatform } from './cfg.types';

export const DefaultCfg: Cfg = {
  multiTab: true,
  loginPageUrl: '/auth/login',
  registerPageUrl: '/auth/register',
  loggedInLandingPageUrl: '/',
  loggedOutRedirectUrl: '/'
};

export const DefaultRemoteCfg: RemoteCfg = {
  endpoint: null,
  method: HttpMethod.get,
  timeout: 2, // seconds
  headers: { 'Content-Type': 'application/json' },
  body: {}
};

export const DefaultAppCfg: AppCfg = {
  version: '0.0.1',
  production: false,
  appName: '@ngcx/cfg',
  target: TargetPlatform.web,
  cfg: DefaultCfg,
  rmtCfg: DefaultRemoteCfg,
  rmtData: {}
};

/** App configuration options */
export const CFG_OPTIONS = new InjectionToken<string>('CFG_OPTIONS');
