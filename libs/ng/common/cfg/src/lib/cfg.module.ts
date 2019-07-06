import {
  NgModule,
  Optional,
  SkipSelf,
  ModuleWithProviders,
  APP_INITIALIZER
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppCfg } from './cfg.models';
import { CFG_OPTIONS } from './cfg.defaults';
import { CfgService } from './cfg.service';

export function remoteSettingsFactory(
  cfgService: CfgService
): () => Promise<any> {
  return () => cfgService.fetchRemoteConfig();
}

// @dynamic
@NgModule({
  imports: [CommonModule, HttpClientModule]
})
export class CfgModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CfgModule
  ) {
    if (parentModule) {
      throw new Error(
        'CfgModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  static forRoot(options?: AppCfg): ModuleWithProviders {
    return {
      ngModule: CfgModule,
      providers: [
        CfgService,
        { provide: CFG_OPTIONS, useValue: options },
        {
          provide: APP_INITIALIZER,
          useFactory: remoteSettingsFactory,
          deps: [CfgService],
          multi: true
        }
      ]
    };
  }
}
