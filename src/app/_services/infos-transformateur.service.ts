import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Transformateur} from '../_classes/transformateur';

@Injectable({
  providedIn: 'root'
})
export class InfosTransformateurService {

  private infosTransformateurUrl: string;

  constructor(private http: HttpClient) {
    this.infosTransformateurUrl = '/api/infoTransformateur';
  }

  public findById(id: number): Observable<Transformateur> {
    return this.http.get<Transformateur>(this.infosTransformateurUrl + '/' + id);
  }


}
