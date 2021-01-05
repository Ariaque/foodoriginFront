export class UrlVideo {

  private id: number;
  private libelle: string;


  constructor(libelle: string) {
    this.libelle = libelle;
  }

  getId(): number {
    return this.id;
  }

  setId(value: number): void{
    this.id = value;
  }

  getLibelle(): string {
    return this.libelle;
  }

  setLibelle(value: string): void {
    this.libelle = value;
  }
}
