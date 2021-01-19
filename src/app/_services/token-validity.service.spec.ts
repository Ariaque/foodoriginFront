import {TestBed} from '@angular/core/testing';

import {TokenValidityService} from './token-validity.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HttpParams} from '@angular/common/http';

describe('TokenValidityService', () => {
  let service: TokenValidityService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenValidityService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TokenValidityService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('checkTokenValidity() should return data', () => {
    service.checkTokenValidity('1', 'token').subscribe((res) => {
      expect(res).toEqual(true);
    });
    const params = new HttpParams().set('id', '1').set('token', 'token');
    const requ = httpTestingController.expectOne('api/reset/resetPassword/validateToken?id=1&token=token');
    expect(requ.request.method).toBe('GET');
  });
});
