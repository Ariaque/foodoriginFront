import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SendResetPassordEmailService {

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

  sendEmail(mail: string): Observable<string> {
    return this.http.post<string>(this.resetUrl + '/resetPassword/sendEmail', {email: mail}, this.httpOptions)
      .pipe(
        catchError(err => {
          console.log('error on email sending', err);
          this.router.navigate(['/error'], { queryParams: { title: 'Erreur', text: 'L\'envoi du mail de réinitialisation a échoué !' } });
          return throwError(err);
        })
      );
  }
}
