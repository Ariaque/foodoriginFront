import {TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('UserService', () => {
  let userService: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    userService = TestBed.inject(UserService);
  });
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });
  describe('#findAll', () => {
    it('returned Observable should match the right data', () => {
      const mockUsers = [
        {
          id: 1,
          username: 'username',
          password: 'hdhfdh52$ù',
          role: null,
          transformateur: null,
          isActivated: false,
          typeTransformateur: null,
        },
        {
          id: 78,
          username: 'username2',
          password: 'fghfgh',
          role: null,
          transformateur: null,
          isActivated: true,
          typeTransformateur: {id: 1, libelle: 'typeTransfo'},
        },
      ];

      userService.findAll()
        .subscribe(usersData => {
          expect(usersData[0].getId).toEqual(1);
          expect(usersData[0].getUsername).toEqual('username');
          expect(usersData[0].getPassword).toEqual('hdhfdh52$ù');
          expect(usersData[0].getRole).toEqual(null);
          expect(usersData[0].getTransformateur).toEqual(null);
          expect(usersData[0].getIsActivated).toEqual(false);
          expect(usersData[0].getTypeTransformateur).toEqual(null);

          expect(usersData[1].getId).toEqual(78);
          expect(usersData[1].getUsername).toEqual('username2');
          expect(usersData[1].getPassword).toEqual('fghfgh');
          expect(usersData[1].getRole).toEqual(null);
          expect(usersData[1].getTransformateur).toEqual(null);
          expect(usersData[1].getIsActivated).toEqual(true);
          expect(usersData[1].getTypeTransformateur.id).toEqual(1);
          expect(usersData[1].getTypeTransformateur.libelle).toEqual('typeTransfo');

        });

      const req = httpTestingController.expectOne(
        '/api/user/all'
      );

      req.flush(mockUsers);
    });
  });
});
