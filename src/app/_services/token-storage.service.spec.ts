import {TestBed} from '@angular/core/testing';

import {TokenStorageService} from './token-storage.service';

describe('TokenStorageService', () => {
  let service: TokenStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  const TOKEN_KEY = 'auth-token';
  const USER_KEY = 'auth-user';

  it('saveToken() should save token in session storage', () => {
    service.saveToken('token');
    expect(window.sessionStorage.getItem(TOKEN_KEY)).toEqual('token');
  });

  it('getToken() should get the token in session storage', () => {
    expect(service.getToken()).toEqual('token');
  });

  it('saveUser() should save user in session storage', () => {

    service.saveUser({username: 'user45', password: 'pwd'});
    expect(window.sessionStorage.getItem(USER_KEY)).toBe('{"username":"user45","password":"pwd"}');
  });
});
