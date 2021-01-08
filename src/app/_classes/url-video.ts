export class UrlVideo {

  constructor(private libelle: string) {
    this.libelle = libelle;
  }

  getLibelle(): string {
    return this.libelle;
  }

  setLibelle(value: string): void {
    this.libelle = value;
  }
}
