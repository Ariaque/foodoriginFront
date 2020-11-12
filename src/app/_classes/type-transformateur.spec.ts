import { TypeTransformateurs } from './type-transformateurs';
import {TestBed} from '@angular/core/testing';

describe('TypeTransformateur', () => {
  let typeTransformateurs: TypeTransformateurs;
  const mockTypeTransformateur = {};

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [{provide: TypeTransformateurs, useValue: mockTypeTransformateur}]});
    typeTransformateurs = TestBed.inject(TypeTransformateurs);
  });

  it('should create an instance', () => {
    expect(typeTransformateurs).toBeTruthy();
  });
});
