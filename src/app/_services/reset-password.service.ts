import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  private resetUrl: string;
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

}
