import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Transformateur} from '../classes/transformateur';

@Injectable({
  providedIn: 'root'
})
export class TransformateurService {

  private transformateurUrl: string;

  constructor(private http: HttpClient) {
    this.transformateurUrl = '/api/transformateur';
  }

  public getTransformateur(id: string): Observable<Transformateur> {
    return this.http.get<Transformateur>(this.transformateurUrl + '/' + id);
  }

}
