import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TypeDenree} from '../_classes/type-denree';
import {OrigineDenree} from '../_classes/origine-denree';

@Injectable({
  providedIn: 'root'
})
export class DenreeService {

  private typeDenreeUrl: string;
  private origineDenreeUrl: string;

  constructor(private http: HttpClient) {
    this.typeDenreeUrl = '/api/typeDenree';
    this.origineDenreeUrl = '/api/origineDenree';
  }

  public findAllTypeDenree(): Observable<TypeDenree[]> {
    return this.http.get<TypeDenree[]>(this.typeDenreeUrl + '/all');
  }

  public findAllTypeDenreeNom(): Observable<string[]> {
    return this.http.get<string[]>(this.typeDenreeUrl + '/nom');
  }

  public findEspeceByNom(nom: string): Observable<string[]> {
    return this.http.get<string[]>(this.typeDenreeUrl + '/espece', {
      params: {
        nom: nom
      }
    });
  }

  public findAnimalByEspece(espece: string): Observable<string[]> {
    return this.http.get<string[]>(this.typeDenreeUrl + '/animal', {
      params: {
        espece: espece
      }
    });
  }

  public findAllOrgineDenree(): Observable<OrigineDenree[]> {
    return this.http.get<OrigineDenree[]>(this.origineDenreeUrl + '/all');
  }

  public findAllPaysOrigine(): Observable<string[]> {
    return this.http.get<string[]>(this.origineDenreeUrl + '/pays');
  }

  public findRegionByPays(pays: string): Observable<string[]> {
    return this.http.get<string[]>(this.origineDenreeUrl + '/regions', {
      params: {
        pays: pays
      }
    });
  }
}
