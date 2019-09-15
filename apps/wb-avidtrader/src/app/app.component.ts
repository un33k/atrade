import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message, UserResponseDTO } from '@agx/dto';
import { CfgService, AppCfg, DefaultAppCfg } from '@ngagx/cfg';
import { LoggerService } from '@ngagx/logger';
import { Observable } from 'rxjs';

@Component({
  selector: 'avidtrader-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  user$: Observable<UserResponseDTO>;

  private appOptions: AppCfg = DefaultAppCfg;
  constructor(private http: HttpClient, private cfg: CfgService, private log: LoggerService) {
    this.appOptions = cfg.options;
    if (!this.appOptions.production) {
      this.log.debug('AppComponent ready ...');
    }
  }

  loadUser() {
    this.user$ = this.http.get<UserResponseDTO>('/api/user/all');
  }
}
