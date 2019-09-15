import { TestBed } from '@angular/core/testing';

import { isMatch } from 'lodash';

import { CfgModule, AppCfg, CFG_OPTIONS } from '@ngagx/cfg';
import { LoggerModule } from '@ngagx/logger';
import { JwtModule } from './jwt.module';
import { JwtService } from './jwt.service';

const validToken = () => {
  // tslint:disable-next-line
  return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJOZWVrd2FyZSBKV1QgQXV0aG9yaXR5ICIsImlhdCI6MjUyOTk0NzU2OSwiZXhwIjoyNTMyNjI1OTY5LCJhdWQiOiJ3d3cubmVla3dhcmUuY29tIiwic3ViIjoiMjIifQ.05FqKNyDJSGceqjUPF0DhI8lLsEYF_2mzHbEvP6MUu8';
};

const expiredToken = () => {
  // tslint:disable-next-line
  return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJOZWVrd2FyZSBKV1QgQXV0aG9yaXR5ICIsImlhdCI6Mjg5MzM2MzY5LCJleHAiOjI5MjAxNDc2OSwiYXVkIjoid3d3Lm5lZWt3YXJlLmNvbSIsInN1YiI6IjIyIn0.aONSjDJrnVBbzeWeTt7Rs9WIb-SWuN99XgK5Lo6dKGo';
};

const validPayload = (): Object => {
  return {
    // Identifier (or, name) of the server or system issuing the token
    iss: 'Neekware JWT Authority ',
    // Date/time when the token was issued.
    iat: 2529947569, // 2050-03-03T19:12:49.785Z
    // Date/time at which point the token is no longer valid.
    exp: 2532625969, // 2050-04-03T19:12:49.785Z
    // Intended recipient of this token; recipient uses it when validating the token.
    aud: 'www.neekware.com',
    // Identifier (or, name) of the user this token represents. (user id)
    sub: '22'
  };
};

const expiredPayload = (): Object => {
  return {
    ...validPayload(),
    ...{
      iat: 289336369, // 1979-03-03T19:12:49.785Z
      exp: 292014769 // 1979-04-03T19:12:49.785Z
    }
  };
};

const AppEnv: AppCfg = {
  appName: '@agngx/jwt',
  production: false,
  version: '1.0.1'
};

// disable console log during test
jest.spyOn(console, 'log').mockImplementation(() => undefined);

describe('JwtService', () => {
  let service: JwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CfgModule.forRoot(AppEnv), LoggerModule, JwtModule],
      providers: [{ provide: CFG_OPTIONS, useValue: AppEnv }]
    });

    service = TestBed.get(JwtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created with default values', () => {
    expect(service.options.networkDelay).toBe(1);
  });

  it('should get payload from token', () => {
    const token = validToken();
    const payload = service.getPayload(token);
    expect(isMatch(payload, validPayload())).toEqual(true);
  });

  it('should detect a valid token', () => {
    const token = validToken();
    const isExpired = service.isExpired(token);
    expect(isExpired).toBe(false);
  });

  it('should detect an expired token', () => {
    const token = expiredToken();
    const isExpired = service.isExpired(token);
    expect(isExpired).toBe(true);
  });

  it('should detect a null token as expired', () => {
    const token = null;
    const isExpired = service.isExpired(token);
    expect(isExpired).toBe(true);
  });

  it('should detect token with missing parts as expired', () => {
    const token = 'part1.part2';
    const isExpired = service.isExpired(token);
    expect(isExpired).toBe(true);
  });

  it('should detect refresh time on a valid token to be greater than zero', () => {
    const token = validToken();
    const refresh = service.getRefreshTime(token);
    expect(refresh).toBeGreaterThan(0);
  });
});
