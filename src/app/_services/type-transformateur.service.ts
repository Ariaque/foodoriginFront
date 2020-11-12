import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TypeTransformateurs} from '../_classes/type-transformateurs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TypeTransformateurService {

  private typeTransformateurUrl: string;

  constructor(private http: HttpClient) {
    this.typeTransformateurUrl = '/api/typeTransformateur';
  }

  public findAll(): Observable<TypeTransformateurs[]> {
    return this.http.get<TypeTransformateurs[]>(this.typeTransformateurUrl + '/all');
  }
}
