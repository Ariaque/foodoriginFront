import { TestBed } from '@angular/core/testing';

import { DenreeService} from './denree.service';

describe('DenreeServiceService', () => {
  let service: DenreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DenreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
