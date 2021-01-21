import {TestBed} from '@angular/core/testing';

import {ResetPasswordService} from './reset-password.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {User} from '../_classes/user';

describe('ResetPasswordService', () => {
  let service: ResetPasswordService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResetPasswordService],
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ResetPasswordService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('saveNewPassword() should save a new pswd', () => {
    service.saveNewPassword('tkn', '1234').subscribe((res) => {
    });
    const req = httpTestingController.expectOne('api/reset/resetPassword/savePassword');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      token: 'tkn',
      newPassword: '1234'
    });
  });

  const userTest = new User(1, 'username1', 'pwd1', null, null, false, null, '0215489625');

  it('resetPassword() should post new password', () => {
    service.resetPassword(userTest, 'oldpswd', 'newpswd').subscribe((res) => {

    });
    const req = httpTestingController.expectOne('api/reset/resetPassword/changePassword');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      userName: userTest,
      oldPassword: 'oldpswd',
      newPassword: 'newpswd'
    });
  });

});
