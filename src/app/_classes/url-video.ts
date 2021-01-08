export class UrlVideo {

  private id: number;
  private libelle: string;

  constructor(id?: number, libelle?: string) {
    this.id = id;
    this.libelle = libelle;
  }

  getId(): number {
    return this.id;
  }

  setId(value: number): void {
    this.id = value;
  }

  getLibelle(): string {
    return this.libelle;
  }

  setLibelle(value: string): void {
    this.libelle = value;
  }
}
