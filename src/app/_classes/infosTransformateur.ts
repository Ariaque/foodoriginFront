import {Transformateur} from './transformateur';
import {Label} from './label';
import {Certification} from './certification';
import {UrlVideo} from './url-video';
import {FermePartenaire} from './ferme-partenaire';

export class InfosTransformateur {

  private _id: number;
  private _fk_transformateur: Transformateur;
  private _description: string;
  private _nombre_employes: string;
  private _url_site: string;
  private _url_facebook: string;
  private _url_twitter: string;
  private _url_instagram: string;
  private _appartient_groupe: boolean;
  private _siret_groupe: string;
  private _labels: Label[];
  private _certifications: Certification[];
  private _urls: UrlVideo[];
  private _fermesP: FermePartenaire[];

  constructor(transformateur: Transformateur, description: string, nombre_employes: string, url_site: string, url_facebook: string, url_twitter: string, url_instagram: string, appartient_groupe: boolean, siret_groupe: string, labels: Label[], certifications: Certification[], urls: UrlVideo[], fermesP: FermePartenaire[]) {
    this._fk_transformateur = transformateur;
    this._description = description;
    this._nombre_employes = nombre_employes;
    this._url_site = url_site;
    this._url_facebook = url_facebook;
    this._url_twitter = url_twitter;
    this._url_instagram = url_instagram;
    this._appartient_groupe = appartient_groupe;
    this._siret_groupe = siret_groupe;
    this._labels = labels;
    this._certifications = certifications;
    this._urls = urls;
    this._fermesP = fermesP;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get fk_transformateur(): Transformateur {
    return this._fk_transformateur;
  }

  set fk_transformateur(value: Transformateur) {
    this._fk_transformateur = this.fk_transformateur;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get nombre_employes(): string {
    return this._nombre_employes;
  }

  set nombre_employes(value: string) {
    this._nombre_employes = value;
  }

  get url_site(): string {
    return this._url_site;
  }

  set url_site(value: string) {
    this._url_site = value;
  }

  get url_facebook(): string {
    return this._url_facebook;
  }

  set url_facebook(value: string) {
    this._url_facebook = value;
  }

  get url_twitter(): string {
    return this._url_twitter;
  }

  set url_twitter(value: string) {
    this._url_twitter = value;
  }

  get url_instagram(): string {
    return this._url_instagram;
  }

  set url_instagram(value: string) {
    this._url_instagram = value;
  }

  get appartient_groupe(): boolean {
    return this._appartient_groupe;
  }

  set appartient_groupe(value: boolean) {
    this._appartient_groupe = value;
  }


  get siret_groupe(): string {
    return this._siret_groupe;
  }

  set siret_groupe(value: string) {
    this._siret_groupe = value;
  }

  get labels(): Label[] {
    return this._labels;
  }

  set labels(value: Label[]) {
    this._labels = value;
  }

  get certifications(): Certification[] {
    return this._certifications;
  }

  set certifications(value: Certification[]) {
    this._certifications = value;
  }
  get urls(): UrlVideo[] {
    return this._urls;
  }
  set urls(value: UrlVideo[]) {
    this._urls = value;
  }

  get fermesP(): FermePartenaire[] {
    return this._fermesP;
  }

  set fermesP(value: FermePartenaire[]) {
    this._fermesP = value;
  }
}
