import { TestBed } from '@angular/core/testing';

import { TokenValidityService } from './token-validity.service';

describe('TokenValidityService', () => {
  let service: TokenValidityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenValidityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
