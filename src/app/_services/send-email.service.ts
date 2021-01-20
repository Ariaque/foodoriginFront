import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {

  private resetUrl: string;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      // 'Authorization': 'token'
    })
  };

  constructor(private http: HttpClient, private router: Router) {
    this.resetUrl = 'api/reset';
  }

  sendResetEmail(mail: string): Observable<string> {
    return this.http.post<string>(this.resetUrl + '/resetPassword/sendEmail', {email: mail}, this.httpOptions)
      .pipe(
        catchError(err => {
          console.log('error on email sending', err);
          if (err.status === 400) {
            this.router.navigate(['/error'], { queryParams: { title: 'Erreur', text: 'Votre email n\'est associé à aucun compte !' } });
          }
          else {
            this.router.navigate(['/error'], { queryParams: { title: 'Erreur', text: 'L\'envoi du mail de réinitialisation a échoué !' } });
            return throwError(err);
          }
        })
      );
  }

  sendContactEmail(mail: string): Observable<string> {
    return this.http.post<string>(this.resetUrl + '/contact/sendEmail', {email: mail}, this.httpOptions)
      .pipe(
        catchError(err => {
          console.log('error on email sending', err);
          if (err.status === 400) {
            this.router.navigate(['/error'], { queryParams: { title: 'Erreur', text: 'Votre email n\'est associé à aucun compte !' } });
          }
          else {
            this.router.navigate(['/error'], { queryParams: { title: 'Erreur', text: 'L\'envoi du mail de réinitialisation a échoué !' } });
            return throwError(err);
          }
        })
      );
  }
}
