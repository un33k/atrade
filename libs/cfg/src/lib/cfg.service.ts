import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { get, isEmpty, merge } from 'lodash';
import { of as observableOf } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';

import { AppCfg, HttpMethod } from './cfg.types';
import { CFG_OPTIONS, DefaultAppCfg } from './cfg.defaults';

@Injectable({
  providedIn: 'root'
})
export class CfgService {
  _options: AppCfg;

  constructor(
    @Inject(CFG_OPTIONS) private appOptions: AppCfg,
    private http: HttpClient
  ) {
    this._options = merge(DefaultAppCfg, appOptions);
    if (!this.options.production) {
      console.log(`CfgService ready ...`);
    }
  }

  fetchRemoteConfig(): Promise<any> {
    const rmtCfg = get(this._options, 'rmtCfg');
    if (rmtCfg) {
      const url = get(rmtCfg, 'endpoint');
      if (url) {
        return new Promise((resolve, reject) => {
          let headers = get(rmtCfg, 'headers', {});
          if (!isEmpty(headers)) {
            headers = new HttpHeaders(headers);
          }
          const method = get(rmtCfg, 'method', HttpMethod.get);
          let methodCall = this.http.get(url, { headers });
          if (method === HttpMethod.post) {
            const body = get(rmtCfg, 'body', {});
            methodCall = this.http.post(url, body, { headers });
          }
          methodCall
            .pipe(
              timeout(rmtCfg.timeout * 1000),
              catchError((err: Response) => {
                console.warn(`CfgService failed. (${get(err, 'message')})`);
                return observableOf({});
              })
            )
            .toPromise()
            .then(resp => {
              if (!isEmpty(resp)) {
                if (!this._options.production) {
                  console.log(`CfgService remote cfg fetched ...`);
                }
                this._options.rmtData = resp;
              }
              resolve(resp);
            });
        });
      }
    }
    return new Promise((resolve, reject) => resolve({}));
  }

  get options() {
    return this._options;
  }
}