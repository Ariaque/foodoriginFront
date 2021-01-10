import { Component, Input, OnInit } from '@angular/core';
import {UserService} from '../../_services/user.service';
import {Transformateur} from '../../_classes/transformateur';
import {User} from '../../_classes/user';
import {TokenStorageService} from '../../_services/token-storage.service';
import {TypeTransformateurs} from '../../_classes/type-transformateurs';
import {Observable, throwError} from 'rxjs';
import {AbstractControl,FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input() 
  form: any = {};
  user : any;
  data: any;
  username : string;  
  transformateur: Transformateur;
  typeTransformateur: TypeTransformateurs;
  oldPassword: string;
  myForm: FormGroup;

  constructor(private _fb: FormBuilder,private userService: UserService, private tokenStorage:TokenStorageService ) { }

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser()
    this.username = this.user.username;
    this.typeTransformateur = this.user.getTypeTransformateur;
    this.userService.findUserByName(this.tokenStorage.getUser().username).subscribe((res: any) => {
      this.data = res;
      this.transformateur = res.transformateur;
      this.typeTransformateur = res.typeTransformateur;
    });
    this.myForm = this._fb.group({
      password: [null, Validators.required],
      newPassword: [null, Validators.required]
    });
  }

  get password(): AbstractControl {
    return this.myForm.get('password');
  }
  get newPassword(): AbstractControl {
    return this.myForm.get('newPassword');
  }
activeUser: User;

  selectUser(user) {
    this.activeUser = user;
    console.log(this.activeUser);
  }

}
