import {Role} from './role';
import {Transformateur} from './transformateur';

export class User {

  private id: number;
  private username: string;
  private password: string;
  private roles: Role[];
  private transformateur: Transformateur;
  private isActivated: boolean;
  private typeTransformateur: string;

  constructor(id: number, username: string, password: string, roles: Role[], transformateur: Transformateur, isActivated: boolean, typeTransformateur: string) {
    this.id = id;
    this.username = username;
    this.roles = roles;
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

  get getRoles(): Role[] {
    return this.roles;
  }

  set setRoles(value: Role[]) {
    this.roles = value;
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

  get getTypeTransformateur(): string {
    return this.typeTransformateur;
  }

  set setTypeTransformateur(value: string) {
    this.typeTransformateur = value;
  }

  get getTransformateur(): Transformateur {
    return this.transformateur;
  }

  set setTransformateur(value: Transformateur) {
    this.transformateur = value;
  }

}
