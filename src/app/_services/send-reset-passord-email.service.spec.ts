import { TestBed } from '@angular/core/testing';

import { SendResetPassordEmailService } from './send-reset-passord-email.service';

describe('SendResetPassordEmailService', () => {
  let service: SendResetPassordEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendResetPassordEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
