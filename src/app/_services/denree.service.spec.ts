import {TestBed} from '@angular/core/testing';

import {DenreeService} from './denree.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {OrigineDenree} from '../_classes/origine-denree';
import {TypeDenree} from '../_classes/type-denree';

describe('DenreeService', () => {
  let service: DenreeService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DenreeService],
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(DenreeService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#findAllTypeDenree', () => {
    it('returned Observable should match the right data', () => {
      const mockTypeDenree: Array<TypeDenree> = [
        new TypeDenree(
          1,
          'boeuf',
          'bovins',
          'vache'
        ), new TypeDenree(
          7,
          'oeuf',
          'espece',
          'poule'
        )
      ];

      service.findAllTypeDenree()
        .subscribe(typeDenreeData => {
          expect(typeDenreeData[0]).toEqual(mockTypeDenree[0]);

          expect(typeDenreeData[1]).toEqual(mockTypeDenree[1]);
        });

      const req = httpTestingController.expectOne(
        '/api/typeDenree/all'
      );

      req.flush(mockTypeDenree);
    });
  });

  describe('#findAllTypeDenreeNom', () => {
    it('returned Observable should match the right data', () => {
      const mockTypeDenreeNom = ['nom1', 'nom2'];
      service.findAllTypeDenreeNom()
        .subscribe(typeDenreeNom => {
          expect(typeDenreeNom[0]).toEqual('nom1');
          expect(typeDenreeNom[1]).toEqual('nom2');
        });
      const req = httpTestingController.expectOne(
        '/api/typeDenree/nom'
      );
      req.flush(mockTypeDenreeNom);
    });
  });

  describe('#findAllOrgineDenree', () => {
    it('returned Observable should match the right data', () => {
      const mockOrigineDenree: Array<OrigineDenree> = [new OrigineDenree(
        1,
        'France',
        'Bretagne')];
      service.findAllOrgineDenree()
        .subscribe(origineDenree => {
          expect(origineDenree).toEqual(mockOrigineDenree);
        });
      const req = httpTestingController.expectOne(
        '/api/origineDenree/all'
      );
      req.flush(mockOrigineDenree);
    });
  });

});
