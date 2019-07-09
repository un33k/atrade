import { LogLevel } from '@agx/base';
import { AppCfg } from '@ngagx/cfg';
import { LoggerCfg } from '@ngagx/logger';
import { I18nCfg, DefaultLanguage } from '@ngagx/i18n';

const loggerCfg: LoggerCfg = {
  level: LogLevel.error
};

const i18nCfg: I18nCfg = {
  defaultLanguage: DefaultLanguage,
  availableLanguages: {
    en: {
      name: 'English',
      locale: '@angular/common/locales/en',
      localeExtra: '@angular/common/locales/extra/en'
    },
    fr: {
      name: 'Français',
      locale: '@angular/common/locales/fr',
      localeExtra: '@angular/common/locales/extra/fr'
    },
    es: {
      name: 'Español',
      locale: '@angular/common/locales/es',
      localeExtra: '@angular/common/locales/extra/es'
    },
    he: {
      name: 'עִברִית',
      locale: '@angular/common/locales/he',
      localeExtra: '@angular/common/locales/extra/he'
    },
    fa: {
      name: 'فارسی',
      locale: '@angular/common/locales/fa',
      localeExtra: '@angular/common/locales/extra/fa'
    }
  },
  enabledLanguages: ['en'],
  cacheBustingHash: ''
};

export const environment: AppCfg = {
  version: '0.0.2',
  production: false,
  logger: loggerCfg,
  i18n: i18nCfg
};

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
