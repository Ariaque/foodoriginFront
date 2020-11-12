import {Role} from './role';
import {Transformateur} from './transformateur';
import {TypeTransformateurs} from './type-transformateurs';

export class User {

  private id: number;
  private username: string;
  private password: string;
  private role: Role;
  private transformateur: Transformateur;
  private isActivated: boolean;
  private typeTransformateur: TypeTransformateurs;

  constructor(id: number, username: string, password: string, role: Role, transformateur: Transformateur, isActivated: boolean, typeTransformateur: TypeTransformateurs) {
    this.id = id;
    this.username = username;
    this.role = role;
    this.isActivated = isActivated;
    this.password = password;
    this.typeTransformateur = typeTransformateur;
    this.transformateur = transformateur;
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

  get getIsActivated(): boolean {
    return this.isActivated;
  }

  set setIsActivated(value: boolean) {
    this.isActivated = value;
  }


  get getPassword(): string {
    return this.password;
  }

  set setPassword(value: string) {
    this.password = value;
  }

  get getTypeTransformateur(): TypeTransformateurs {
    return this.typeTransformateur;
  }

  set setTypeTransformateur(value: TypeTransformateurs) {
    this.typeTransformateur = value;
  }

  get getTransformateur(): Transformateur {
    return this.transformateur;
  }

  set setTransformateur(value: Transformateur) {
    this.transformateur = value;
  }

}
