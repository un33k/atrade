import { registerLocaleData } from '@angular/common';

import { LanguageInfo } from './i18n.models';

/**
 * Registers the active locales with Angular
 * @param avialableLanguages List of available language codes
 * @param enabledLanguages Listof enabled langage codes
 */
export function registerActiveLocales(avialableLanguages: LanguageInfo, enabledLanguages: string[]) {
  for (const lang of enabledLanguages) {
    const { locale, localeExtra } = avialableLanguages[lang];
    registerLocaleData(locale, localeExtra);
  }
}
