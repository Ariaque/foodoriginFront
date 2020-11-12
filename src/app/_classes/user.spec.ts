import {User} from './user';
import {TestBed} from '@angular/core/testing';

describe('User', () => {

  let user: User;
  const mockUser = {};

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [{provide: User, useValue: mockUser}]});
    user = TestBed.inject(User);
  });

  it('should create an instance', () => {
    expect(user).toBeTruthy();
  });
});
