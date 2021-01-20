import {Role} from './role';
import {Transformateur} from './transformateur';
import {TypeTransformateur} from './type-transformateur';

export class User {

  private id: number;
  private username: string;
  private password: string;
  private role: Role;
  private transformateur: Transformateur;
  private isEnabled: boolean;
  private typeTransformateur: TypeTransformateur;
  private numeroTelephone: string;

  constructor(id: number, username: string, password: string, role: Role, transformateur: Transformateur, isEnabled: boolean, typeTransformateur: TypeTransformateur, numeroTel: string) {
    this.id = id;
    this.username = username;
    this.role = role;
    this.isEnabled = isEnabled;
    this.password = password;
    this.typeTransformateur = typeTransformateur;
    this.transformateur = transformateur;
    this.numeroTelephone = numeroTel;
  }

  get getId(): number {
    return this.id;
  }

  set setId(value: number) {
    this.id = value;
  }

  get getUsername(): string {
    return this.username;
  }

  set setUsername(value: string) {
    this.username = value;
  }

  get getRole(): Role {
    return this.role;
  }

  set setRole(value: Role) {
    this.role = value;
  }

  get getIsEnabled(): boolean {
    return this.isEnabled;
  }

  set setIsEnabled(value: boolean) {
    this.isEnabled = value;
  }


  get getPassword(): string {
    return this.password;
  }

  set setPassword(value: string) {
    this.password = value;
  }

  get getTypeTransformateur(): TypeTransformateur {
    return this.typeTransformateur;
  }

  set setTypeTransformateur(value: TypeTransformateur) {
    this.typeTransformateur = value;
  }

  get getTransformateur(): Transformateur {
    return this.transformateur;
  }

  set setTransformateur(value: Transformateur) {
    this.transformateur = value;
  }

  get getNumeroTelephone(): string {
    return this.numeroTelephone;
  }

  set setNumeroTelephone(value: string) {
    this.numeroTelephone = value;
  }

}
