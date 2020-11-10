import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../_classes/user';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl: string;

  constructor(private http: HttpClient) {
    this.userUrl = '/api/user';
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl + '/all').pipe(
      map((data: any[]) => data.map((item: any) => new User(
        item.id,
        item.username,
        item.roles,
        item.isActivated,
        item.password,
        item.typeTransformateur,
      ))),
    );
  }

  public activateUser(user: User): void {
    console.log('le post : ', JSON.stringify(user));
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    // var dest = survey.DType;
    this.http.post(`/api/user/save`,
      JSON.stringify(user), headers)
      .subscribe(
        (val) => {
          console.log('POST call successful value returned in body',
            val);
        },
        response => {
          console.log('POST call error', response);
        },
        () => {
          console.log('The POST observable is now completed.');
        });
  }

  public desactivateUser(user: User): void {
    console.log('le post : ', JSON.stringify(user));
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    // var dest = survey.DType;
    this.http.post(`/api/user/save`,
      JSON.stringify(user), headers)
      .subscribe(
        (val) => {
          console.log('POST call successful value returned in body',
            val);
        },
        response => {
          console.log('POST call error', response);
        },
        () => {
          console.log('The POST observable is now completed.');
        });
  }
}
