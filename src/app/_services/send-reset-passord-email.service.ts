import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

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

  constructor(private http: HttpClient) {
    this.resetUrl = 'api/reset';
  }

  sendEmail(mail: string): Observable<string> {
    return this.http.post<string>(this.resetUrl + '/resetPassword/sendEmail', {email: mail}, this.httpOptions)
      .pipe(
        catchError(err => {
          console.log('error on email sending', err);
          return throwError(err);
        })
      );
  }
}
