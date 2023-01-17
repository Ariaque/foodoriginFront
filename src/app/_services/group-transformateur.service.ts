import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AddGroupTransformateur } from '../_classes/add-group-transformateur';
import { GroupTransformateur } from '../_classes/group-transformateur';

@Injectable({
  providedIn: 'root'
})
export class GroupTransformateurService {

  private groupTransformateurUrl:string; 
  private httpOptions;
  constructor(private http:HttpClient) { 
    this.groupTransformateurUrl = "/api/groupTransformateur";
    this.setHeader();
  }

  public findAll():Observable<GroupTransformateur[]>{
    return this.http.get<GroupTransformateur[]>(this.groupTransformateurUrl +'/all', {headers: this.httpOptions.headers}) ;
  }

  public findByTransformateur(idTransformateur:number):Observable<GroupTransformateur>{
    return this.http.get<GroupTransformateur>(this.groupTransformateurUrl+'/transformateur/'+idTransformateur, {headers: this.httpOptions.headers})
  }

  public save(group:AddGroupTransformateur):Observable<any>{
      return this.http.post(this.groupTransformateurUrl+'/save',group, this.httpOptions)
  }

  public setHeader(): void {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }
}
