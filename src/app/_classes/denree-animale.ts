export class DenreeAnimale {

  private id: number;
  private nom: string;
  private origine: string;

  constructor(id ?: number, nom?: string, origine?: string) {
    this.id = id;
    this.nom = nom;
    this.origine = origine;
  }

  getId(): number {
    return this.id;
  }

  setId(value: number): void {
    this.id = value;
  }

  getNom(): string {
    return this.nom;
  }

  setNom(value: string): void {
    this.nom = value;
  }

  getOrigine(): string {
    return this.origine;
  }

  setOrigine(value: string): void {
    this.origine = value;
  }
}
