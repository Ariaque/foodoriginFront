export class FermePartenaire {

  private id: number;
  private nom: string;
  private description: string;
  private url: string;

  constructor(id ?: number, nom?: string, description?: string, url ?: string) {
    this.id = id;
    this.nom = nom;
    this.description = description;
    this.url = url;
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

  getUrl(): string {
    return this.url;
  }

  setUrl(value: string): void {
    this.url = value;
  }

}
