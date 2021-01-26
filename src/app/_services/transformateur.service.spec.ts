import {TestBed} from '@angular/core/testing';

import {TransformateurService} from './transformateur.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('TransformateurService', () => {
  let transformateurService: TransformateurService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransformateurService],
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    transformateurService = TestBed.inject(TransformateurService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(transformateurService).toBeTruthy();
  });

  it('returned Observable should match the right data', () => {
    const mockTransformateurs = [
      {
        _id: 1,
        _num_agrement: '03.005.007',
        _siret: '12345698745896',
        _raison_sociale: 'raison sociale',
        _adresse: '7 rue de rennes',
        _code_postal: '35000',
        _commune: 'Rennes',
        _categorie: 'categorie',
        _act_associees: 'act_associees',
        _espece: 'espece',
        _latitude: 'latitude',
        _longitude: 'longitude',
      }
    ];

    transformateurService.findById(1)
      .subscribe(transformateursData => {
        expect(transformateursData[0]._id).toEqual(1);
        expect(transformateursData[0]._num_agrement).toEqual('03.005.007');
        expect(transformateursData[0]._siret).toEqual('12345698745896');
        expect(transformateursData[0]._raison_sociale).toEqual('raison sociale');
        expect(transformateursData[0]._adresse).toEqual('7 rue de rennes');
        expect(transformateursData[0]._code_postal).toEqual('35000');
        expect(transformateursData[0]._commune).toEqual('Rennes');
        expect(transformateursData[0]._categorie).toEqual('categorie');
        expect(transformateursData[0]._act_associees).toEqual('act_associees');
        expect(transformateursData[0]._espece).toEqual('espece');
        expect(transformateursData[0]._latitude).toEqual('latitude');
        expect(transformateursData[0]._longitude).toEqual('longitude');
      });

    const req = httpTestingController.expectOne(
      '/api/transformateur/1'
    );

    req.flush(mockTransformateurs);
  });
});
