import { TestBed } from '@angular/core/testing';

import { GroupTransformateurService } from './group-transformateur.service';

describe('GroupTransformateurService', () => {
  let service: GroupTransformateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupTransformateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
