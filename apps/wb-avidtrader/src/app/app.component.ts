import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@agx/api-interface';
import { CfgService, AppCfg, DefaultAppCfg } from '@ngagx/cfg';
import { LoggerService } from '@ngagx/logger';

@Component({
  selector: 'avidtrader-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  private appOptions: AppCfg = DefaultAppCfg;
  constructor(private http: HttpClient, private cfg: CfgService, private log: LoggerService) {
    this.appOptions = cfg.options;
    if (!this.appOptions.production) {
      this.log.debug('AppComponent ready ...');
    }
  }
}
