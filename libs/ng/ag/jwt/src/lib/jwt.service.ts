/**
 * @license
 * Copyright Neekware Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at http://neekware.com/license/MIT.html
 */

import { Injectable } from '@angular/core';

import { merge as ldNestedMerge } from 'lodash';
import { Base64 } from 'js-base64';
import { CfgService } from '@ngagx/cfg';
import { LoggerService } from '@ngagx/logger';

import { JwtCfg } from './jwt.types';
import { DefaultJwtCfg } from './jwt.defaults';

/**  An injectable class that handles JWT service */
@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private initializedOptions: JwtCfg = DefaultJwtCfg;

  /**
   * Class constructor
   * @param options an optional configuration object
   */
  constructor(private cfg: CfgService, private log: LoggerService) {
    this.initializedOptions = ldNestedMerge(DefaultJwtCfg, cfg.options.jwt);
    if (!this.cfg.options.production) {
      log.debug(`JwtService ready ...`);
    }
  }

  /**
   * Gets the payload portion of a JWT token
   * @param token JWT token (base64 encrypted)
   * @returns a payload object or null if decode fails
   */
  getPayload(token: string): any {
    const parts = token ? token.split('.') : [];
    if (parts.length !== 3) {
      this.log.error('JWT must have 3 parts');
    } else {
      try {
        const decoded = Base64.decode(parts[1]);
        const payload = JSON.parse(decoded);
        return payload;
      } catch (e) {
        this.log.error('Cannot decode the token');
      }
    }
    return null;
  }

  /**
   * Tells if a JWT is token is expired
   * @param payload JWT payload object
   * @return false if JWT is valid and not expired, false for invalid JWT or already expired
   */
  isExpired(payload: any): boolean {
    if (typeof payload === 'string') {
      payload = this.getPayload(payload);
    }
    if (payload) {
      const leeway = payload.leeway || this.initializedOptions.expiryLeeway;
      const offset = leeway * 1000;
      const now = this.utcSeconds();
      const expiry = this.utcSeconds(payload.exp);
      return now > expiry + offset;
    }
    return true;
  }

  /**
   * Calculates the next refresh time
   * @param payload JWT payload object
   * @param offset if true, a random time is added to the refresh time
   * where networkDelay < random < leeway
   * @returns total number of seconds till expiry or 0 if token is expired
   */
  getRefreshTime(payload: any, offset = true): number {
    if (typeof payload === 'string') {
      payload = this.getPayload(payload);
    }
    if (payload && !this.isExpired(payload)) {
      const now = this.utcSeconds();
      const expiry = this.utcSeconds(payload.exp);
      const refresh = Math.floor((expiry - now) / 1000);
      const random = this.getRandomOffset(payload);
      return offset ? refresh + random : refresh;
    }
    return 0;
  }

  /**
   * Calculates a random number where networkDelay < random < leeway
   * @param payload JWT payload object
   * @returns a random total number of seconds
   */
  private getRandomOffset(payload: any): number {
    if (typeof payload === 'string') {
      payload = this.getPayload(payload);
    }
    const leeway = payload.leeway || this.initializedOptions.expiryLeeway;
    const range = {
      lower: 1,
      upper: leeway - this.initializedOptions.networkDelay || 2
    };
    return Math.floor(Math.random() * range.upper + range.lower);
  }

  /**
   * Calculates the UTC value of date/time in seconds
   * @param input date/time in seconds
   * @returns UTC value of date/time in seconds
   */
  private utcSeconds(input?: number): number {
    return input ? new Date(0).setUTCSeconds(input).valueOf() : new Date().valueOf();
  }

  /** Make readonly copy of initializedOptions public */
  get options() {
    return this.initializedOptions;
  }
}
