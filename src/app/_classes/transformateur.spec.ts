import {Transformateur} from './transformateur';
import {TestBed} from '@angular/core/testing';

describe('Transformateur', () => {
  let transformateur: Transformateur;
  const mockTransformateur = {};

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [{provide: Transformateur, useValue: mockTransformateur}]});
    transformateur = TestBed.inject(Transformateur);
  });

  it('should create an instance', () => {
    expect(transformateur).toBeTruthy();
  });
});
