/**
 * Class representing the UrlVideo entity in the API
 */
export class UrlVideo {

  private id: number;
  private libelle: string;
  private titre: string;

  constructor(id?: number, libelle?: string, titre?: string) {
    this.id = id;
    this.libelle = libelle;
    this.titre = titre;
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

  getTitre(): string {
    return this.titre;
  }

  setTitre(value: string): void {
    this.titre = value;
  }
}
