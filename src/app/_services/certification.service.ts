import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Certification} from '../_classes/certification';

@Injectable({
  providedIn: 'root'
})
export class CertificationService {

  private certificationUrl: string;

  constructor(private http: HttpClient) {
    this.certificationUrl = '/api/certification';
  }

  public findAll(): Observable<Certification[]> {
    return this.http.get<Certification[]>(this.certificationUrl + '/all');
  }

  public findById(id: number): Observable<Certification> {
    return this.http.get<Certification>(this.certificationUrl + '/' + id);
  }
}
