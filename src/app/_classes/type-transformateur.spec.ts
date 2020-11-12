import {TypeTransformateur} from './type-transformateur';
import {TestBed} from '@angular/core/testing';

describe('TypeTransformateur', () => {
  let typeTransformateur: TypeTransformateur;
  const mockTypeTransformateur = {};

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [{provide: TypeTransformateur, useValue: mockTypeTransformateur}]});
    typeTransformateur = TestBed.inject(TypeTransformateur);
  });

  it('should create an instance', () => {
    expect(typeTransformateur).toBeTruthy();
  });
});
