import { TestBed, inject } from '@angular/core/testing';

import { Observable, of as observableOf } from 'rxjs';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

import { CfgModule, AppCfg } from '@ngagx/cfg';
import { LoggerModule } from '@ngagx/logger';

import { I18nModule } from './i18n.module';
import { I18nService } from './i18n.service';
import { DefaultLanguage } from './i18n.defaults';

const AppEnv: AppCfg = {
  appName: '@nwx/i18n',
  production: false,
  version: '1.0.1'
};

export const I18nTranslations = {
  de: {
    'COMMON.WELCOME': 'herzlich willkommen',
    'COMMON.ABOUT': 'Über'
  },
  en: {
    'COMMON.WELCOME': 'Welcome',
    'COMMON.ABOUT': 'About'
  },
  es: {
    'COMMON.WELCOME': 'Bienvenido',
    'COMMON.ABOUT': 'Acerca de'
  },
  fa: {
    'COMMON.WELCOME': 'خوش آمدی',
    'COMMON.ABOUT': 'در باره'
  },
  fr: {
    'COMMON.WELCOME': 'Bienvenue',
    'COMMON.ABOUT': 'Sur'
  },
  he: {
    'COMMON.WELCOME': 'ברוך הבא',
    'COMMON.ABOUT': 'על אודות'
  },
  'zh-cn': {
    'COMMON.WELCOME': '欢迎',
    'COMMON.ABOUT': '关于'
  }
};

class CustomLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return observableOf(I18nTranslations[lang]);
  }
}

// disable console log during test
jest.spyOn(console, 'log').mockImplementation(() => undefined);

describe('I18nService', () => {
  let service: I18nService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CfgModule.forRoot(AppEnv),
        LoggerModule,
        I18nModule.forRoot(),
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: CustomLoader }
        })
      ]
    });

    service = TestBed.get(I18nService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created with default options', () => {
    expect(service.options.defaultLanguage).toEqual(DefaultLanguage);
  });

  it('should translate to English', () => {
    service.xlate.get('COMMON.WELCOME').subscribe((res: string) => {
      expect(res).toEqual('Welcome');
    });
  });

  // TODO: add async language change test
});
