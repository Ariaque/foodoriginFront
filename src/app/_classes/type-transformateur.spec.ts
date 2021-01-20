import { TypeTransformateur } from './type-transformateur';
import {TestBed} from '@angular/core/testing';

describe('TypeTransformateur', () => {
  let typeTransformateurs: TypeTransformateur;
  const mockTypeTransformateur = {};

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [{provide: TypeTransformateur, useValue: mockTypeTransformateur}]});
    typeTransformateurs = TestBed.inject(TypeTransformateur);
  });

  it('should create an instance', () => {
    expect(typeTransformateurs).toBeTruthy();
  });
});
