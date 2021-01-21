import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {UserService} from './user.service';
import {User} from '../_classes/user';
import {Role} from '../_classes/role';
import {Transformateur} from '../_classes/transformateur';
import {TypeTransformateur} from '../_classes/type-transformateur';

describe('UserService', () => {
  let userService: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    userService = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  const transformateurDetails = new Transformateur(1,
    '01.004.002',
    '12365478953265',
    'nom entreprise',
    '7 rue de paris',
    '35000',
    'Rennes',
    'C',
    null,
    null,
    null, null);

  const typeTransformateurDetails = new TypeTransformateur(1, 'artisan');

  const roleDetails = new Role(1, 'role_user');

  const userListResponse: Array<User> = [
    new User(1, 'username1', 'pwd1', roleDetails, transformateurDetails, false, typeTransformateurDetails, '0215489625'),
    new User(2, 'username2', 'pwd2', roleDetails, transformateurDetails, true, typeTransformateurDetails, '0217489625'),
    new User(3, 'username3', 'pwd3', roleDetails, transformateurDetails, false, typeTransformateurDetails, '0785489625'),
  ];

  it('findAll() should return data', () => {
    userService.findAll().subscribe((res) => {
      expect(res).toEqual(userListResponse);
    });

    const req = httpMock.expectOne('/api/user/all');
    expect(req.request.method).toBe('GET');
    req.flush(userListResponse);
  });

  it('findUsers() should return data', () => {
    userService.findUsers().subscribe((res) => {
      expect(res).toEqual(userListResponse);
    });

    const req = httpMock.expectOne('/api/user/users');
    expect(req.request.method).toBe('GET');
    req.flush(userListResponse);
  });

  it('findUserByName() should return data', () => {
    userService.findUserByName('username3').subscribe((res) => {
      expect(res).toEqual(userListResponse[2]);
    });

    const req = httpMock.expectOne('/api/user/username3');
    expect(req.request.method).toBe('GET');
    req.flush(userListResponse[2]);
  });

  it('userActivation() should return data', () => {
    userService.userActivation(userListResponse[0]).subscribe((res) => {
      expect(userListResponse[0].getIsEnabled).toEqual(true);
    });
    const req = httpMock.expectOne('/api/user/save');
    expect(req.request.method).toBe('POST');
  });

  it('deleteUser() should return data', () => {
    userService.deleteUser(userListResponse[2]).subscribe((res) => {
      expect(userListResponse.length).toBe(2);
    });
    const req = httpMock.expectOne('/api/user/delete');
    expect(req.request.method).toBe('POST');
  });

});
