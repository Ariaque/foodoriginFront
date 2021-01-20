import { Component, OnInit, Input } from '@angular/core';
import {TokenStorageService} from '../../_services/token-storage.service';
import {UserService} from '../../_services/user.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  form: any = {};
  description: string;
  objet: string;
  phone: number;
  @Input()
  myForm: FormGroup;

  constructor( private _fb: FormBuilder,private tokenService: TokenStorageService, private userService: UserService) { }

  ngOnInit(): void {
    const reg = '(0)[1-9][0-9]{8}';
    this.myForm = this._fb.group({
      username: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.pattern(reg)]],
      objet: [null, Validators.required],
      description: [null,Validators.required]
    });
  }
  get username(): AbstractControl {
    return this.myForm.get('username');
  }

  get numPhone(): AbstractControl {
    return this.myForm.get('phone');
  }
  get objt(): AbstractControl {
    return this.myForm.get('objet');
  }
  get desc(): AbstractControl {
    return this.myForm.get('description');
  }
}



