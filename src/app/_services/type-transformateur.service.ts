import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TypeTransformateur} from '../_classes/type-transformateur';
import {HttpClient} from '@angular/common/http';

/**
 * Service that calls TypeTransformateurController in the API
 */
@Injectable({
  providedIn: 'root'
})
export class TypeTransformateurService {

  private typeTransformateurUrl: string;

  constructor(private http: HttpClient) {
    this.typeTransformateurUrl = '/api/typeTransformateur';
  }

  public findAll(): Observable<TypeTransformateur[]> {
    return this.http.get<TypeTransformateur[]>(this.typeTransformateurUrl + '/all');
  }
}
