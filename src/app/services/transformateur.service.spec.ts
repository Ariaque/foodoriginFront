import { TestBed } from '@angular/core/testing';

import { TransformateurService } from './transformateur.service';

describe('TransformateurService', () => {
  let service: TransformateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransformateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
