export class Transformateur {

  private _id: number;
  private _num_agrement: string;
  private _siret: string;
  private _raison_sociale: string;
  private _adresse: string;
  private _code_postal: string;
  private _commune: string;
  private _categorie: string;
  private _act_associees: string;
  private _espece: string;
  private _latitude: string;
  private _longitude: string;


  constructor(id: number, num_agrement: string, siret: string, raison_sociale: string, adresse: string, code_postal: string, commune: string, categorie: string,
              act_associees: string, espece: string, latitude: string, longitude: string) {
    this._id = id;
    this._num_agrement = num_agrement;
    this._siret = siret;
    this._raison_sociale = raison_sociale;
    this._adresse = adresse;
    this._code_postal = code_postal;
    this._commune = commune;
    this._categorie = categorie;
    this._act_associees = act_associees;
    this._espece = espece;
    this._latitude = latitude;
    this._longitude = longitude;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get num_agrement(): string {
    return this._num_agrement;
  }

  set num_agrement(value: string) {
    this._num_agrement = value;
  }

  get siret(): string {
    return this._siret;
  }

  set siret(value: string) {
    this._siret = value;
  }

  get raison_sociale(): string {
    return this._raison_sociale;
  }

  set raison_sociale(value: string) {
    this._raison_sociale = value;
  }

  get adresse(): string {
    return this._adresse;
  }

  set adresse(value: string) {
    this._adresse = value;
  }

  get code_postal(): string {
    return this._code_postal;
  }

  set code_postal(value: string) {
    this._code_postal = value;
  }

  get commune(): string {
    return this._commune;
  }

  set commune(value: string) {
    this._commune = value;
  }

  get categorie(): string {
    return this._categorie;
  }

  set categorie(value: string) {
    this._categorie = value;
  }

  get act_associees(): string {
    return this._act_associees;
  }

  set act_associees(value: string) {
    this._act_associees = value;
  }

  get espece(): string {
    return this._espece;
  }

  set espece(value: string) {
    this._espece = value;
  }

  get latitude(): string {
    return this._latitude;
  }

  set latitude(value: string) {
    this._latitude = value;
  }

  get longitude(): string {
    return this._longitude;
  }

  set longitude(value: string) {
    this._longitude = value;
  }
}
