import {TestBed} from '@angular/core/testing';

import {SendEmailService} from './send-email.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('SendEmailService', () => {
  let service: SendEmailService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SendEmailService],
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(SendEmailService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('sendResetEmail() should send an email', () => {
    service.sendResetEmail('mail reset').subscribe((res) => {
    });
    const req = httpTestingController.expectOne('api/reset/resetPassword/sendEmail');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      email: 'mail reset'
    });
  });


  it('sendContactEmail() should send an email pswd', () => {
    service.sendContactEmail('add@xxx.com', 'mail object', '0121122212', 'message').subscribe((res) => {
    });
    const req = httpTestingController.expectOne('api/contact/sendEmail');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      emailAdress: 'add@xxx.com', subjet: 'mail object', phoneNumber: '0121122212', message: 'message'
    });
  });

  it('sendContactEmail() should send an email pswd', () => {
    service.sendNotificationEmail('add@xxx.com', 'mail object', '0121122212', 'message').subscribe((res) => {
    });
    const req = httpTestingController.expectOne('api/contact/notify');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      emailAdress: 'add@xxx.com', subjet: 'mail object', phoneNumber: '0121122212', message: 'message'
    });
  });
});
