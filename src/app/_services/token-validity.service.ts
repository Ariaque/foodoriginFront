import { Injectable } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TokenValidityService {

  private resetUrl: string;
  constructor(private http: HttpClient) {
    this.resetUrl = 'api/reset';
  }

  public checkTokenValidity(identifiant: string, tkn: string): Observable<boolean> {
    const params = new HttpParams().set('id', identifiant).set('token', tkn);
    return this.http.get<boolean>(this.resetUrl + '/resetPassword/validateToken', {params});
  }
}
