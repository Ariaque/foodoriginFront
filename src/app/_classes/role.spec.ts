import {Role} from './role';
import {TestBed} from '@angular/core/testing';

describe('Role', () => {
  let role: Role;
  const mockRole = {};

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [{provide: Role, useValue: mockRole}]});
    role = TestBed.inject(Role);
  });

  it('should create an instance', () => {
    expect(role).toBeTruthy();
  });
});
