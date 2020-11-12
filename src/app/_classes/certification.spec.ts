import {Certification} from './certification';
import {TestBed} from '@angular/core/testing';

describe('Certification', () => {

  let certification: Certification;
  const mockCertification = {
    _id: 1,
    _libelle: 'lhdfhibelle'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [{provide: Certification, useValue:  mockCertification}]});
    certification = TestBed.inject(Certification);
  });

  it('should create an instance', () => {
    expect(certification).toBeTruthy();
  });
});
