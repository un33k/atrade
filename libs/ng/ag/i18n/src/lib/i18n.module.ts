import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { get as ldGet } from 'lodash';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CfgService } from '@ngagx/cfg';

/** Translation file loader */
export function HttpLoaderFactory(http: HttpClient, cfgService: CfgService) {
  let cacheBust = '';
  const cache = ldGet(cfgService.options.i18n, 'cacheBustingHash');
  if (cache) {
    cacheBust = `?hash=${cache}`;
  }
  return new TranslateHttpLoader(http, '/assets/i18n/', `.json${cacheBust}`);
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient, CfgService]
      }
    })
  ],
  exports: [TranslateModule]
})
export class I18nModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: I18nModule
    };
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: TranslateModule
    };
  }
}
