import { TestBed } from '@angular/core/testing';

import { SendEmailService } from './send-email.service';

describe('SendResetPassordEmailService', () => {
  let service: SendEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
