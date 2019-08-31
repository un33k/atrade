import { I18nCfg } from './i18n.types';

// https://meta.wikimedia.org/wiki/Template:List_of_language_names_ordered_by_code
export const RtlLanguages: string[] = ['ar', 'fa', 'he', 'arc', 'dv', 'ha', 'khw', 'ks', 'ku', 'ps', 'ur', 'yi'];

export const DefaultLanguage = 'en';

/**
 * Default configuration - i18n module
 */
export const DefaultI18nCfg: I18nCfg = {
  defaultLanguage: DefaultLanguage,
  availableLanguages: {
    en: {
      name: 'English',
      locale: '@angular/common/locales/en',
      localeExtra: '@angular/common/locales/extra/en'
    }
  },
  enabledLanguages: ['en'],
  cacheBustingHash: ''
};
