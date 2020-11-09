import { TestBed } from '@angular/core/testing';

import { InfosTransformateurService } from './infos-transformateur.service';

describe('InfosTransformateurService', () => {
  let service: InfosTransformateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfosTransformateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
