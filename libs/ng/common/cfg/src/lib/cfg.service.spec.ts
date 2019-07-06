import { TestBed, inject, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { CfgService } from './cfg.service';
import { AppCfg, HttpMethod } from './cfg.models';
import { CFG_OPTIONS, DEFAULT_HTTP_TIMEOUT } from './cfg.defaults';
import { CfgModule } from './cfg.module';

const AppEnv: AppCfg = {
  version: '1.0.1',
  production: true,
  rmtCfg: {
    endpoint: 'http://example.com/remote/cfg'
  }
};

describe('CfgService local config', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CfgModule.forRoot(AppEnv)],
      providers: [{ provide: CFG_OPTIONS, useValue: AppEnv }, CfgService]
    });

    // disable console warn during test
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
  });

  it('should be created', inject([CfgService], (service: CfgService) => {
    expect(service).toBeDefined();
  }));

  it('should have the version options', inject(
    [CfgService],
    (service: CfgService) => {
      expect(service.options.version).toBe('1.0.1');
    }
  ));

  it('should have merged the default config options', inject(
    [CfgService],
    (service: CfgService) => {
      expect(service.options.cfg.loginPageUrl).toBe('/auth/login');
    }
  ));

  it('should have merged the default options with the remote options', inject(
    [CfgService],
    (service: CfgService) => {
      expect(service.options.rmtCfg.timeout).toEqual(DEFAULT_HTTP_TIMEOUT);
    }
  ));
});

describe('CfgService remote confign via GET', () => {
  let injector: TestBed;
  let service: CfgService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: CFG_OPTIONS, useValue: AppEnv }, CfgService]
    });

    injector = getTestBed();
    service = injector.get(CfgService);
    httpMock = injector.get(HttpTestingController);

    // disable console warn during test
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => {
    service.options.rmtData = null;
    httpMock.verify();
  });

  it('should get remote config via GET', () => {
    const mockRemoteData = {
      country: 'US',
      state: 'California',
      splash: 'https://foo.com/election.gif'
    };

    service.fetchRemoteConfig().then(() => {
      expect(service.options.rmtData).toEqual(mockRemoteData);
    });

    const mockReq = httpMock.expectOne(service.options.rmtCfg.endpoint);
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.method).toEqual('GET');
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(mockRemoteData);
  });

  it('should get remote config handle Error', () => {
    service.fetchRemoteConfig().then(() => {
      expect(service.options.rmtData).toEqual(null);
    });

    const mockReq = httpMock.expectOne(service.options.rmtCfg.endpoint);
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(null, { status: 400, statusText: 'Bad Request' });
  });
});

describe('CfgService remote config via POSt', () => {
  let injector: TestBed;
  let service: CfgService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: CFG_OPTIONS,
          useValue: {
            ...AppEnv,
            rmtCfg: { ...AppEnv.rmtCfg, method: HttpMethod.post }
          }
        },
        CfgService
      ]
    });

    injector = getTestBed();
    service = injector.get(CfgService);
    httpMock = injector.get(HttpTestingController);

    // disable console warn during test
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => {
    service.options.rmtData = null;
    httpMock.verify();
  });

  it('should get remote config via POST', () => {
    const mockRemoteData = {
      country: 'US',
      state: 'California',
      splash: 'https://foo.com/election.gif'
    };

    injector.overrideProvider(CFG_OPTIONS, {
      useValue: {
        ...AppEnv,
        rmtCfg: { ...AppEnv.rmtCfg, method: HttpMethod.post }
      }
    });

    expect(service.options.rmtCfg.method).toBe(HttpMethod.post);

    service.fetchRemoteConfig().then(() => {
      expect(service.options.rmtData).toEqual(mockRemoteData);
    });

    const mockReq = httpMock.expectOne(service.options.rmtCfg.endpoint);
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.method).toEqual('POST');
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(mockRemoteData);
  });
});
