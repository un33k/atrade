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
  production: true,
  logger: loggerCfg,
  i18n: i18nCfg
};
