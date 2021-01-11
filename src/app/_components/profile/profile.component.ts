import { Component, Input, OnInit } from '@angular/core';
import {UserService} from '../../_services/user.service';
import {Transformateur} from '../../_classes/transformateur';
import {User} from '../../_classes/user';
import {TokenStorageService} from '../../_services/token-storage.service';
import {TypeTransformateurs} from '../../_classes/type-transformateurs';
import {Observable, throwError} from 'rxjs';
import {AbstractControl,FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ResetPasswordService} from '../../_services/reset-password.service';


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
  newPassword: string;
  password:string;
  myForm: FormGroup;
  id: number;

  constructor(private _fb: FormBuilder,private userService: UserService, private tokenStorage:TokenStorageService,private resetPasswordService: ResetPasswordService) { }

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser()
    this.username = this.user.username;
    this.typeTransformateur = this.user.getTypeTransformateur;
    this.userService.findUserByName(this.tokenStorage.getUser().username).subscribe((res: any) => {
      this.data = res;
      this.transformateur = res.transformateur;
      this.typeTransformateur = res.typeTransformateur;
      this.id = res.id;

    });
    this.myForm = this._fb.group({
      password: [null, Validators.required],
      newPassword: [null, Validators.required]
    });
  }
 
  get oldPsd(): AbstractControl {
    return this.myForm.get('password');
  }
  get newPsd(): AbstractControl {
    return this.myForm.get('newPassword');
  }
  onSubmit(): void {
    this.resetPasswordService.resetPassword(this.username,this.password,this.newPassword).subscribe(
      success => {
        if (success){
          console.log('Nouveau mot de passe enregistré !');
        }},
        err => {
          if (err){
          console.log('Error!');
          }}
    );
  }
activeUser: User;

  selectUser(user) {
    this.activeUser = user;
    console.log(this.activeUser);
  }

}
