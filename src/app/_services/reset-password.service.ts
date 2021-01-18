import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  private resetUrl: string;
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(private http: HttpClient, private router: Router) {
    this.resetUrl = 'api/reset';
  }

  saveNewPassword(tkn: string, pswd: string): Observable<string> {
    return this.http.post<string>(this.resetUrl + '/resetPassword/savePassword', {token: tkn, newPassword: pswd}).pipe(
      catchError(err => {
        console.log('error userActivation', err);
        this.router.navigate(['/error'], { queryParams: { title: 'Erreur', text: 'La réinitialisation du mot de passe a échouée !' } });
        return throwError(err);
      })
    );
  }
  resetPassword(user, oldpswd: string, newpswd: string): Observable<string>{
    return this.http.post<string>(this.resetUrl + '/resetPassword/changePassword', {
      userName: user,
      oldPassword: oldpswd,
      newPassword: newpswd
    }, this.httpOptions);
  }
}
