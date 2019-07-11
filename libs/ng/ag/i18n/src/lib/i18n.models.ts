export interface LanguageInfo {
  // iso code for language
  [iso: string]: {
    // native name of language
    name: string;
    // angular locale path for language
    locale?: string;
    // angular extra locale path for language
    localeExtra?: string;
    // one or more optional app-specific field(s)
    [id: string]: any;
  };
}

export enum LanguageDirection {
  // Left to Right
  'ltr' = 'ltr',
  // Right to Left
  'rtl' = 'rtl'
}

export class I18nCfg {
  // available languages
  availableLanguages: LanguageInfo;
  // enabled languages (default ['en'])
  enabledLanguages: string[];
  // default language (default = 'en')
  defaultLanguage?: string;
  // cache busting hash
  cacheBustingHash?: string;
}

/**
 * Wrapper for translation extractor tools such as @biesbjerg/ngx-translate-extract
 * @param key - string to be translated
 */
export function _(key: string): string {
  return key;
}
