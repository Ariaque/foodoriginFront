import {TestBed} from '@angular/core/testing';

import {TypeTransformateurService} from './type-transformateur.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('TypeTransformateurService', () => {
  let typeTransformateurService: TypeTransformateurService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TypeTransformateurService],
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    typeTransformateurService = TestBed.inject(TypeTransformateurService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(typeTransformateurService).toBeTruthy();
  });

  describe('#findAll', () => {
    it('returned Observable should match the right data', () => {
      const mockTypesTransfo = [
        {
          id: 1,
          libelle: 'type 1',
        },
        {
          id: 2,
          libelle: 'type 2',
        },
      ];

      typeTransformateurService.findAll()
        .subscribe(typeData => {
          expect(typeData[0].id).toEqual(1);
          expect(typeData[0].libelle).toEqual('type 1');

          expect(typeData[1].id).toEqual(2);
          expect(typeData[1].libelle).toEqual('type 2');
        });

      const req = httpTestingController.expectOne(
        '/api/typeTransformateur/all'
      );

      req.flush(mockTypesTransfo);
    });
  });
});

