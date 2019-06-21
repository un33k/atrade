import {
  TestBed,
  inject,
  fakeAsync,
  tick,
  getTestBed
} from '@angular/core/testing';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { CfgService } from './cfg.service';
import { AppCfg, TargetPlatform, HttpMethod } from './cfg.types';
import { CFG_OPTIONS } from './cfg.defaults';
import { CfgModule } from './cfg.module';

const AppEnv: AppCfg = {
  version: '1.0.0',
  production: true,
  rmtCfg: {
    endpoint: 'http://example.com/remote/cfg'
  }
};

describe('CfgService local', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CfgModule.forRoot(AppEnv)],
      providers: [{ provide: CFG_OPTIONS, useValue: AppEnv }, CfgService]
    });
  });

  it('should be created', inject([CfgService], (service: CfgService) => {
    expect(service).toBeTruthy();
  }));

  it('should be have the version options', inject(
    [CfgService],
    (service: CfgService) => {
      expect(service.options.version).toBe('1.0.0');
    }
  ));

  it('should be have merged the default config options', inject(
    [CfgService],
    (service: CfgService) => {
      expect(service.options.cfg.loginPageUrl).toBe('/auth/login');
    }
  ));

  it('should be have merged the default rmt config options', inject(
    [CfgService],
    (service: CfgService) => {
      expect(service.options.rmtCfg.timeout).toBe(2);
    }
  ));
});

describe('CfgService remote config', () => {
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
  });

  afterEach(() => {
    service.options.rmtData = null;
  });

  it('should get remote config via GET', () => {
    const mockRemoteData = {
      country: 'US',
      state: 'California',
      splash: 'https://foo.com/election.gif'
    };

    service.loadRemoteOptions().then(() => {
      expect(service.options.rmtData).toEqual(mockRemoteData);
    });

    const mockReq = httpMock.expectOne(service.options.rmtCfg.endpoint);
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.method).toEqual('GET');
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(mockRemoteData);

    httpMock.verify();
  });

  it('should get remote config via POST', () => {
    const mockRemoteData = {
      country: 'US',
      state: 'California',
      splash: 'https://foo.com/election.gif'
    };

    service.options.rmtCfg.method = HttpMethod.post;
    service.loadRemoteOptions().then(() => {
      expect(service.options.rmtData).toEqual(mockRemoteData);
    });

    const mockReq = httpMock.expectOne(service.options.rmtCfg.endpoint);
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.method).toEqual('POST');
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(mockRemoteData);

    httpMock.verify();
  });

  it('should get remote config handle Error', () => {
    const mockRemoteData = {
      country: 'US',
      state: 'California',
      splash: 'https://foo.com/election.gif'
    };

    service.loadRemoteOptions().then(() => {
      expect(service.options.rmtData).toEqual(null);
    });

    const mockReq = httpMock.expectOne(service.options.rmtCfg.endpoint);
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(null, { status: 400, statusText: 'Bad Request' });

    httpMock.verify();
  });
});
