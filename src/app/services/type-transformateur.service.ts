import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TypeTransformateur} from '../classes/type-transformateur';
import {HttpClient} from '@angular/common/http';

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
