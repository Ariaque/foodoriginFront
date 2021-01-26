/**
 * Class representing the TypeDenree entity in the API
 */
export class TypeDenree {

  private id: number;
  private nom: string;
  private espece: string;
  private animal: string;

  constructor(id ?: number, nom ?: string, espece ?: string, animal ?: string) {
    this.id = id;
    this.nom = nom;
    this.espece = espece;
    this.animal = animal;
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

  getEspece(): string {
    return this.espece;
  }

  setEspece(value: string): void {
    this.espece = value;
  }

  getAnimal(): string {
    return this.animal;
  }

  setAnimal(value: string): void {
    this.animal = value;
  }
}
