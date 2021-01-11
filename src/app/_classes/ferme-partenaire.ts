export class FermePartenaire {

  private id: number;
  private nom: string;
  private description: string;

  constructor(id ?: number, nom?: string, description?: string) {
    this.id = id;
    this.nom = nom;
    this.description = description;
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

  getDescription(): string {
    return this.description;
  }

  setDescription(value: string): void {
    this.description = value;
  }
  equals(ferme: FermePartenaire): boolean {
    let ret = false;
    if (ferme.description === this.description && ferme.nom === this.nom) {
      ret = true;
    }
    return ret;
  }
}
