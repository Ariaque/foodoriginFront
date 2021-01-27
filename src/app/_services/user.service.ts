import {Injectable} from '@angular/core';
import {
  HttpClient,
  HttpHeaderResponse,
  HttpHeaders,
  HttpProgressEvent,
  HttpResponse,
  HttpSentEvent, HttpUserEvent
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {User} from '../_classes/user';
import {catchError, map} from 'rxjs/operators';
import {TokenStorageService} from './token-storage.service';
import {Transformateur} from '../_classes/transformateur';

/**
 * Service that calls UserController in the API
 */

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl: string;
  private httpOptions;

  constructor(private http: HttpClient, private tokenService: TokenStorageService) {
    this.userUrl = '/api/user';
    this.setHeader();
  }

  public findAll(): Observable<User[]> {
    let ret: Observable<User[]>;
    ret = this.http.get<User[]>(this.userUrl + '/all', {headers: this.httpOptions.headers}).pipe(
      map((data: any[]) => data.map((item: any) => new User(
        item.id,
        item.username,
        item.password,
        item.role,
        item.transformateur,
        item.isEnabled,
        item.typeTransformateur,
        item.numeroTelephone
      ))),
    );
    return ret;
  }
  public findUsers(): Observable<User[]> {
    let ret: Observable<User[]>;
    ret = this.http.get<User[]>(this.userUrl + '/users', {headers: this.httpOptions.headers}).pipe(
      map((data: any[]) => data.map((item: any) => new User(
        item.id,
        item.username,
        item.password,
        item.role,
        item.transformateur,
        item.isEnabled,
        item.typeTransformateur,
        item.numeroTelephone
      ))),
    );
    return ret;
  }

  public findTransformateurByUser(userName: string): Observable<Transformateur> {
    return  this.http.get<Transformateur>(this.userUrl + '/transformateur/' + userName, {headers: this.httpOptions.headers});
  }

  userActivation(user: User): Observable<HttpSentEvent | HttpHeaderResponse | HttpResponse<User> | HttpProgressEvent | HttpUserEvent<User>> {
    return this.http.post<User>(this.userUrl + '/save', user, this.httpOptions)
      .pipe(
        catchError(err => {
          return throwError(err);
        })
      );
  }

  public findUserByName(name): Observable<User> {
    return this.http.get<User>(this.userUrl + '/' + name, {headers: this.httpOptions.headers});
  }

  public findUserActivationByName(name): Observable<boolean> {
    return this.http.get<boolean>(this.userUrl + '/activation/' + name, {headers: this.httpOptions.headers});
  }

  public findUserInfosByName(userName: string): Observable<any> {
    return this.http.get<User>(this.userUrl + '/userInfos/' + userName, {headers: this.httpOptions.headers});
  }

  public deleteUser(user): Observable<any> {
    return this.http.post(this.userUrl + '/delete', user, this.httpOptions);
  }

  public setHeader(): void {
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };
  }

}
