export class FermePartenaire {

  private nom: string;
  private description: string;

  constructor(nom: string, description: string) {
    this.nom = nom;
    this.description = description;
  }

  getNom(): string {
    return this.nom;
  }

  setNom(value: string): void {
    this.nom = value;
  }

  getDescription(): string {
    return this.description;
  }

  setDescription(value: string): void {
    this.description = value;
  }
}
