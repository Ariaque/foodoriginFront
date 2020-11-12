import {TestBed} from '@angular/core/testing';

import {LabelService} from './label.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('LabelService', () => {
  let labelService: LabelService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LabelService],
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    labelService = TestBed.inject(LabelService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(labelService).toBeTruthy();
  });

  describe('#findAll', () => {
    it('returned Observable should match the right data', () => {
      const mockLabels = [
        {
          id: 1,
          libelle: 'libelle 1',
        },
        {
          id: 54,
          libelle: 'libelle 2',
        },
      ];

      labelService.findAll()
        .subscribe(labelsData => {
          expect(labelsData[0].id).toEqual(1);
          expect(labelsData[0].libelle).toEqual('libelle 1');

          expect(labelsData[1].id).toEqual(54);
          expect(labelsData[1].libelle).toEqual('libelle 2');
        });

      const req = httpTestingController.expectOne(
        '/api/label/all'
      );

      req.flush(mockLabels);
    });
  });

  describe('#findById', () => {
    it('returned Observable should match the right data', () => {
      const mockLabel = [
        {
          id: 54,
          libelle: 'libelle 2',
        },
      ];
      labelService.findById(54)
        .subscribe(labelsData => {
          expect(labelsData[0].id).toEqual(54);
          expect(labelsData[0].libelle).toEqual('libelle 2');
        });
      const req = httpTestingController.expectOne(
        '/api/label/54'
      );
      req.flush(mockLabel);
    });
  });
});
