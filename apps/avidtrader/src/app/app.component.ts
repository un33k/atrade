import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@ngpx/api-interface';
import { CfgService } from '@ngpx/common/cfg';

@Component({
  selector: 'avidtrader-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  constructor(private http: HttpClient, private cfg: CfgService) {}
}
