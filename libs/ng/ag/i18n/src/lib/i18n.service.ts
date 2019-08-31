import { Injectable, Output, EventEmitter } from '@angular/core';

import { merge as ldNestedMerge } from 'lodash';
import { TranslateService } from '@ngx-translate/core';
import { CfgService } from '@ngagx/cfg';
import { LoggerService } from '@ngagx/logger';

import { I18nCfg, LanguageDirection } from './i18n.types';
import { RtlLanguages, DefaultI18nCfg, DefaultLanguage } from './i18n.defaults';
import { registerActiveLocales } from './i18n.locales';

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  private initializedOptions: I18nCfg = DefaultI18nCfg;
  currentLanguage = DefaultLanguage;
  defaultLanguage = DefaultLanguage;
  direction: string = LanguageDirection.ltr;
  availableLanguages: { [key: string]: any } = {};
  enabledLanguages: string[] = [];
  @Output() languageChange$ = new EventEmitter<string>();

  constructor(public cfg: CfgService, public log: LoggerService, public xlate: TranslateService) {
    this.initializedOptions = ldNestedMerge(DefaultI18nCfg, cfg.options.jwt);
    this.initLanguage();
    if (!this.cfg.options.production) {
      log.debug(`I18nService ready ... (${this.currentLanguage} - ${this.direction})`);
    }
  }

  isLanguageEnabled(iso: string): boolean {
    return this.enabledLanguages.indexOf(iso) > -1;
  }

  getLanguageDirection(iso: string): string {
    if (this.isLanguageRTL(iso)) {
      return LanguageDirection.rtl;
    }
    return LanguageDirection.ltr;
  }

  isLanguageRTL(iso: string): boolean {
    return RtlLanguages.indexOf(iso) > -1;
  }

  isCurrentLanguage(iso: string): boolean {
    return iso === this.xlate.currentLang;
  }

  getLanguageName(iso: string): string {
    return this.isLanguageEnabled(iso) ? this.availableLanguages[iso].name : null;
  }

  setCurrentLanguage(iso: string) {
    if (this.isLanguageEnabled(iso)) {
      this.xlate.use(iso);
    } else {
      this.log.debug(`I18nService - language not enabled ... (${this.currentLanguage})`);
    }
  }

  private initLanguage() {
    this.defaultLanguage = this.initializedOptions.defaultLanguage;
    this.availableLanguages = this.initializedOptions.availableLanguages;
    this.enabledLanguages = this.initializedOptions.enabledLanguages;

    this.xlate.onLangChange.subscribe(event => {
      this.currentLanguage = event.lang;
      this.direction = this.getLanguageDirection(event.lang);
      this.languageChange$.emit(event.lang);
      if (!this.cfg.options.production) {
        this.log.debug(`I18nService - language changed ... (${this.currentLanguage})`);
      }
    });

    registerActiveLocales(this.initializedOptions.availableLanguages, this.initializedOptions.enabledLanguages);

    this.xlate.addLangs(Object.keys(this.initializedOptions.enabledLanguages));
    this.xlate.setDefaultLang(this.defaultLanguage);
    let iso = this.xlate.getBrowserCultureLang().toLowerCase();
    if (!this.isLanguageEnabled(iso)) {
      iso = this.defaultLanguage;
    }
    this.setCurrentLanguage(iso);
  }

  get options() {
    return this.initializedOptions;
  }
}
