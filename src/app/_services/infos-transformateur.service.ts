import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InfosTransformateur} from '../_classes/infosTransformateur';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class InfosTransformateurService {

  private infosTransformateurUrl: string;

  constructor(private http: HttpClient) {
    this.infosTransformateurUrl = '/api/infoTransformateur';
  }

  public findById(id: number): Observable<InfosTransformateur> {
    return this.http.get<InfosTransformateur>(this.infosTransformateurUrl + '/transformateur/' + id);
  }

  public saveInfosTransformateur(infosT: InfosTransformateur): Observable<InfosTransformateur>{
    return this.http.post<InfosTransformateur>(this.infosTransformateurUrl, {
      transformateur: infosT.fk_transformateur,
      description: infosT.description,
      nombre_employes: infosT.nombre_employes,
      url_site: infosT.url_site,
      url_facebook: infosT.url_facebook,
      url_twitter: infosT.url_twitter,
      url_instagram: infosT.url_instagram,
      appartient_groupe: infosT.appartient_groupe,
      labels: infosT.labels,
      certifications: infosT.certifications,
      urls: infosT.urls
    }, httpOptions);
  }

  public addImageTransformateur(image: FormData, id: number): any {
   return this.http.post(this.infosTransformateurUrl + '/images/' + id, image, {responseType: 'text'});
  }
}
