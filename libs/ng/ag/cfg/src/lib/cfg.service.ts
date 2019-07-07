import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { merge as ldNestedMerge } from 'lodash';
import { of as observableOf } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';

import { AppCfg, HttpMethod } from './cfg.models';
import { CFG_OPTIONS, DefaultAppCfg, DEFAULT_HTTP_TIMEOUT } from './cfg.defaults';

@Injectable({
  providedIn: 'root'
})
export class CfgService {
  private initializedOptions: AppCfg;

  constructor(private http: HttpClient, @Inject(CFG_OPTIONS) private appCfg: AppCfg) {
    this.initializedOptions = ldNestedMerge(DefaultAppCfg, appCfg);
    if (!this.options.production) {
      console.log(`CfgService ready ...`);
    }
  }

  /**
   * Fetches remote configuration options via get or post
   */
  fetchRemoteConfig(): Promise<any> {
    const rmtCfg = this.initializedOptions.rmtCfg;
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
                console.warn(`CfgService failed. (${err.statusText || 'unknown'})`);
                return observableOf({});
              })
            )
            .toPromise()
            .then(resp => {
              if (Object.keys(resp || {}).length) {
                if (!this.initializedOptions.production) {
                  console.log(`CfgService remote cfg fetched ...`);
                }
                this.initializedOptions.rmtData = resp;
              }
              resolve(resp);
            });
        });
      }
    }
    return new Promise((resolve, reject) => resolve({}));
  }

  /**
   * Makes readonly copy of initializedOptions public
   */
  get options() {
    return this.initializedOptions;
  }
}
