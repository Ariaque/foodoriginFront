import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Label} from '../classes/label';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  private labelUrl: string;

  constructor(private http: HttpClient) {
    this.labelUrl = '/api/label';
  }

  public findAll(): Observable<Label[]> {
    return this.http.get<Label[]>(this.labelUrl + '/all');
  }

  public findById(id: number): Observable<Label> {
    return this.http.get<Label>(this.labelUrl + '/' + id);
  }
}
