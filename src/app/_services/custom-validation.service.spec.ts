import {TestBed} from '@angular/core/testing';

import {CustomValidationService} from './custom-validation.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('CustomValidationService', () => {
  let service: CustomValidationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomValidationService],
    });

    service = TestBed.inject(CustomValidationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
