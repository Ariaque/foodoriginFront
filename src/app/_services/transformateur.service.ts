import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Transformateur} from '../_classes/transformateur';

/**
 * Service that calls TransformateurController in the API
 */
@Injectable({
  providedIn: 'root'
})
export class TransformateurService {

  private transformateurUrl: string;

  constructor(private http: HttpClient) {
    this.transformateurUrl = '/api/transformateur';
  }

  public findById(id: number): Observable<Transformateur> {
    return this.http.get<Transformateur>(this.transformateurUrl + '/' + id);
  }

}
