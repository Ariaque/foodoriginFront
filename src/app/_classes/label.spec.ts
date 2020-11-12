import {Label} from './label';
import {TestBed} from '@angular/core/testing';

describe('Label', () => {
  let label: Label;
  const mockLabel = {};

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [{provide: Label, useValue: mockLabel}]});
    label = TestBed.inject(Label);
  });

  it('should create an instance', () => {
    expect(label).toBeTruthy();
  });
});
