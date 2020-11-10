import { TestBed } from '@angular/core/testing';

import { TypeTransformateurService } from './type-transformateur.service';

describe('TypeTransformateurService', () => {
  let service: TypeTransformateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeTransformateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
