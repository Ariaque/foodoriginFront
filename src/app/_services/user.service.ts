import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {User} from '../_classes/user';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl: string;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      // 'Authorization': 'token'
    })
  };

  constructor(private http: HttpClient) {
    this.userUrl = '/api/user';
  }

  public findAll(): Observable<User[]> {
    let ret: Observable<User[]>;
    ret = this.http.get<User[]>(this.userUrl + '/all').pipe(
      map((data: any[]) => data.map((item: any) => new User(
        item.id,
        item.username,
        item.password,
        item.role,
        item.transformateur,
        item.isActivated,
        item.typeTransformateur,
      ))),
    );
    return ret;
  }

  userActivation(user: User): Observable<User> {
    return this.http.post<User>(this.userUrl + '/save', user, this.httpOptions)
      .pipe(
        catchError(err => {
          console.log('error userActivation', err);
          return throwError(err);
        })
      );
  }
}
