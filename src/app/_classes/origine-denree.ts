/**
 * Class representing the OrigineDenree entity in the API
 */
export class OrigineDenree {

  private id: number;
  private pays: string;
  private region: string;

  constructor(id?: number, pays ?: string, region ?: string) {
    this.id = id;
    this.pays = pays;
    this.region = region;
  }

  getId(): number {
    return this.id;
  }

  setId(value: number): void {
    this.id = value;
  }

  getPays(): string {
    return this.pays;
  }

  setPays(value: string): void {
    this.pays = value;
  }

  getRegion(): string {
    return this.region;
  }

  setRegion(value: string): void {
    this.region = value;
  }
}
