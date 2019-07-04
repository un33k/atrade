import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { of as observableOf } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';
import { merge as ldNestedMerge } from 'lodash';

import { AppCfg, HttpMethod } from './cfg.types';
import {
  CFG_OPTIONS,
  DefaultAppCfg,
  DEFAULT_HTTP_TIMEOUT
} from './cfg.defaults';

@Injectable({
  providedIn: 'root'
})
export class CfgService {
  private _options: AppCfg;

  constructor(
    @Inject(CFG_OPTIONS) private appOptions: AppCfg,
    private http: HttpClient
  ) {
    this._options = ldNestedMerge(DefaultAppCfg, appOptions);
    if (!this.options.production) {
      console.log(`CfgService ready ...`);
    }
  }

  fetchRemoteConfig(): Promise<any> {
    const rmtCfg = this._options.rmtCfg;
    if (rmtCfg) {
      const url = rmtCfg.endpoint;
      if (url) {
        return new Promise((resolve, reject) => {
          let headers = rmtCfg.headers || {};
          if (!Object.keys(headers).length) {
            headers = new HttpHeaders(headers);
          }
          const httpMethod = rmtCfg.method || HttpMethod.get;
          let httpRequest = this.http.get(url, { headers });
          if (httpMethod === HttpMethod.post) {
            const postBody = rmtCfg.body || {};
            httpRequest = this.http.post(url, postBody, { headers });
          }
          const httpTimeout = (rmtCfg.timeout || DEFAULT_HTTP_TIMEOUT) * 1000;
          httpRequest
            .pipe(
              timeout(httpTimeout),
              catchError((err: Response) => {
                console.warn(
                  `CfgService failed. (${err.statusText || 'unknown'})`
                );
                return observableOf({});
              })
            )
            .toPromise()
            .then(resp => {
              if (Object.keys(resp || {}).length) {
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
