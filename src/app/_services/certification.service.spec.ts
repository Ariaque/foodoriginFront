import {TestBed} from '@angular/core/testing';

import {CertificationService} from './certification.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('CertificationService', () => {
  let service: CertificationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CertificationService],
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CertificationService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#findAll', () => {
    it('returned Observable should match the right data', () => {
      const mockCertifications = [
        {
          id: 1,
          libelle: 'libelle certif 1',
        },
        {
          id: 54,
          libelle: 'libelle certif 2',
        },
      ];

      service.findAll()
        .subscribe(certificationsData => {
          expect(certificationsData[0].id).toEqual(1);
          expect(certificationsData[0].libelle).toEqual('libelle certif 1');

          expect(certificationsData[1].id).toEqual(54);
          expect(certificationsData[1].libelle).toEqual('libelle certif 2');
        });

      const req = httpTestingController.expectOne(
        '/api/certification/all'
      );

      req.flush(mockCertifications);
    });
  });

  describe('#findById', () => {
    it('returned Observable should match the right data', () => {
      const mockCertification = [
        {
          id: 54,
          libelle: 'libelle 2',
        },
      ];
      service.findById(54)
        .subscribe(certificationsData => {
          expect(certificationsData[0].id).toEqual(54);
          expect(certificationsData[0].libelle).toEqual('libelle 2');
        });
      const req = httpTestingController.expectOne(
        '/api/certification/54'
      );
      req.flush(mockCertification);
    });
  });
});
