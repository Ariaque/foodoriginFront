import {TestBed} from '@angular/core/testing';

import {InfosTransformateurService} from './infos-transformateur.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {InfosTransformateur} from '../_classes/infosTransformateur';

describe('InfosTransformateurService', () => {
  let service: InfosTransformateurService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InfosTransformateurService],
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(InfosTransformateurService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  afterEach(() => {
    httpTestingController.verify();
  });
  const mockInfos = new InfosTransformateur(
    null,
    null,
    'description',
    '15',
    'www.google.com',
    'www.facebook.com',
    'www.twitter.com',
    false,
    'www.instagram.com',
    null,
    null,
    null,
    null,
    null,
  );
  describe('#findById', () => {
    it('returned Observable should match the right data', () => {
      service.findById(20)
        .subscribe(infosTransfoData => {
          expect(infosTransfoData).toEqual(mockInfos);
        });
      const req = httpTestingController.expectOne(
        '/api/infoTransformateur/transformateur/20'
      );
      req.flush(mockInfos);
    });
  });
});
