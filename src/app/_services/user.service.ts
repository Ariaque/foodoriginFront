import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../_classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl: string;

  constructor(private http: HttpClient) {
    this.userUrl = '/api/user';
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl + '/all');
  }
}
