import { InjectionToken } from '@angular/core';

import { Cfg, HttpMethod, RemoteCfg, AppCfg, TargetPlatform } from './cfg.models';

/** Default remote http call timeout */
export const DEFAULT_HTTP_TIMEOUT = 3;

/** Default local config */
export const DefaultCfg: Cfg = {
  multiTab: true,
  loginPageUrl: '/auth/login',
  registerPageUrl: '/auth/register',
  loggedInLandingPageUrl: '/',
  loggedOutRedirectUrl: '/'
};

/** Default remote config fetch */
export const DefaultRemoteCfg: RemoteCfg = {
  endpoint: null,
  method: HttpMethod.get,
  timeout: DEFAULT_HTTP_TIMEOUT,
  headers: { 'Content-Type': 'application/json' },
  body: {}
};

/** Default application-wide config */
export const DefaultAppCfg: AppCfg = {
  version: '0.0.1',
  production: false,
  appName: '@ngcx/cfg',
  target: TargetPlatform.web,
  cfg: DefaultCfg,
  rmtCfg: DefaultRemoteCfg,
  rmtData: {}
};

/** App configuration options token */
export const CFG_OPTIONS = new InjectionToken<string>('CFG_OPTIONS');
