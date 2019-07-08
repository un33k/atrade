import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule]
})
export class JwtModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: JwtModule
  ) {
    if (parentModule) {
      throw new Error('JwtModule is already loaded. Import it in the AppModule only');
    }
  }
}
