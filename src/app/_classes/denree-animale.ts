import {TypeDenree} from './type-denree';
import {OrigineDenree} from './origine-denree';
/**
 * Class representing the DenreeAnimale entity in the API
 */
export class DenreeAnimale {
  private id: number;
  private typeDenree: TypeDenree;
  private origineDenree: OrigineDenree;
  private infosTypeDenree: string;
  private infosOrigineDenree: string;


  constructor(id?: number, typeDenree?: TypeDenree, origineDenree?: OrigineDenree, infosTypeDenree?: string, infosOrigineDenree?: string) {
    this.id = id;
    this.typeDenree = typeDenree;
    this.origineDenree = origineDenree;
    this.infosTypeDenree = infosTypeDenree;
    this.infosOrigineDenree = infosOrigineDenree;
  }


  getId(): number {
    return this.id;
  }

  setId(value: number): void {
    this.id = value;
  }

  getTypeDenree(): TypeDenree {
    return this.typeDenree;
  }

  setTypeDenree(value: TypeDenree): void {
    this.typeDenree = value;
  }

  getOrigineDenree(): OrigineDenree {
    return this.origineDenree;
  }

  setOrgineDenree(value: OrigineDenree): void {
    this.origineDenree = value;
  }

  getInfosTypeDenree(): string {
    return this.infosTypeDenree;
  }

  setInfosTypeDenree(value: string): void {
    this.infosTypeDenree = value;
  }

  getInfosOrigineDenree(): string {
    return this.infosOrigineDenree;
  }

  setInfosOrigineDenree(value: string): void {
    this.infosOrigineDenree = value;
  }
}


