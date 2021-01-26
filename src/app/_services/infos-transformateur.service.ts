import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InfosTransformateur} from '../_classes/infosTransformateur';
import {TokenStorageService} from './token-storage.service';

let httpOptions;

@Injectable({
  providedIn: 'root'
})

export class InfosTransformateurService {

  private infosTransformateurUrl: string;
  private header: HttpHeaders;


  constructor(private http: HttpClient, private tokenService: TokenStorageService) {
    this.infosTransformateurUrl = '/api/infoTransformateur';
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
        Authorization: 'Bearer ' + tokenService.getToken()})
    };
  }

  public findById(id: number): Observable<InfosTransformateur> {
    return this.http.get<InfosTransformateur>(this.infosTransformateurUrl + '/transformateur/' + id, { headers: httpOptions.headers});
  }

  public saveInfosTransformateur(idInfos: number, infosT: InfosTransformateur): Observable<HttpEvent<InfosTransformateur>>{
    if (idInfos !== 0) {
      return this.http.post<InfosTransformateur>(this.infosTransformateurUrl, {
        id: idInfos,
        transformateur: infosT.fk_transformateur,
        description: infosT.description,
        nombre_employes: infosT.nombre_employes,
        url_site: infosT.url_site,
        url_facebook: infosT.url_facebook,
        url_twitter: infosT.url_twitter,
        url_instagram: infosT.url_instagram,
        appartient_groupe: infosT.appartient_groupe,
        siret_groupe: infosT.siret_groupe,
        labels: infosT.labels,
        certifications: infosT.certifications,
        urls: infosT.urls,
        fermesP: infosT.fermesP,
        denrees: infosT.denrees
      }, httpOptions);
    }
    else {
      return this.http.post<InfosTransformateur>(this.infosTransformateurUrl, {
        transformateur: infosT.fk_transformateur,
        description: infosT.description,
        nombre_employes: infosT.nombre_employes,
        url_site: infosT.url_site,
        url_facebook: infosT.url_facebook,
        url_twitter: infosT.url_twitter,
        url_instagram: infosT.url_instagram,
        appartient_groupe: infosT.appartient_groupe,
        siret_groupe: infosT.siret_groupe,
        labels: infosT.labels,
        certifications: infosT.certifications,
        urls: infosT.urls,
        fermesP: infosT.fermesP,
        denrees: infosT.denrees
      }, httpOptions);
    }
  }

  public addImageTransformateur(image: FormData, id: number): Observable<any> {
   return this.http.post(this.infosTransformateurUrl + '/images/' + id, image, {responseType: 'text'});
  }

  public getImageTransformateur(id: number): Observable<any> {
    return this.http.get(this.infosTransformateurUrl + '/images/' + id, httpOptions);
  }

  public deleteImageTransformateur(fileName: string, id: number): Observable<any> {
    return this.http.post(this.infosTransformateurUrl + '/images/delete/' + id, fileName);
  }
}
