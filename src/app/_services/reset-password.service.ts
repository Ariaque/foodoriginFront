import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {TokenStorageService} from './token-storage.service';

/**
 * Service that calls PasswordResetController in the API
 */
@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  private resetUrl: string;
  private httpOptions;

  constructor(private http: HttpClient, private router: Router, private tokenService: TokenStorageService) {
    this.resetUrl = 'api/reset';
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json',
        Authorization: 'Bearer ' + tokenService.getToken()})};
  }

  saveNewPassword(tkn: string, pswd: string): Observable<string> {
    return this.http.post<string>(this.resetUrl + '/resetPassword/savePassword', {token: tkn, newPassword: pswd}).pipe(
      catchError(err => {
        this.router.navigate(['/error'], { queryParams: { title: 'Erreur', text: 'La réinitialisation du mot de passe a échouée !' } });
        return throwError(err);
      })
    );
  }
  resetPassword(user, oldpswd: string, newpswd: string): Observable<HttpEvent<string>>{
    return this.http.post<string>(this.resetUrl + '/resetPassword/changePassword', {
      userName: user,
      oldPassword: oldpswd,
      newPassword: newpswd
    }, this.httpOptions);
  }
}
