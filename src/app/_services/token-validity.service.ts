import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';

/**
 * Service that calls PasswordResetController in the API to check the validity of a token
 */
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
