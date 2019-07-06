import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { CfgModule } from '@ngagx/cfg';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, CfgModule.forRoot(environment)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
