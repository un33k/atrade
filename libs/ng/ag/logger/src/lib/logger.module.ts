import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, HttpClientModule]
})
export class LoggerModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: LoggerModule
  ) {
    if (parentModule) {
      throw new Error('LoggerModule is already loaded. Import it in the AppModule only');
    }
  }
}
