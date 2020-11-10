import {Erole} from './erole.enum';

export class Role {

  private _id: number;
  private _name: Erole;


  constructor(id: number, name: Erole) {
    this._id = id;
    this._name = name;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): Erole {
    return this._name;
  }

  set name(value: Erole) {
    this._name = value;
  }
}
