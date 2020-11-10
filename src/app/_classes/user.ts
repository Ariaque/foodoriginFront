import {Role} from './role';

export class User {

  private _id: number;
  private _username: string;
  private _password: string;
  private _roles: Role[];

  constructor(id: number, username: string, password: string, roles: Role[]) {
    this._id = id;
    this._username = username;
    this._password = password;
    this._roles = roles;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get roles(): Role[] {
    return this._roles;
  }

  set roles(value: Role[]) {
    this._roles = value;
  }
}
