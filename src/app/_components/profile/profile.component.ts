import { Component, Input, OnInit } from '@angular/core';
import {UserService} from '../../_services/user.service';
import {Transformateur} from '../../_classes/transformateur';
import {User} from '../../_classes/user';
import {TokenStorageService} from '../../_services/token-storage.service';
import {TypeTransformateur} from '../../_classes/type-transformateur';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ResetPasswordService} from '../../_services/reset-password.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input()
  form: any = {};
  user: any;
  data: any;
  username: string;
  roleUser: string;
  transformateur: Transformateur;
  typeTransformateur: TypeTransformateur;
  newPassword: string;
  password: string;
  numTel: string;
  myForm: FormGroup;
  id: number;
  activeUser: User;

  constructor(private _fb: FormBuilder, private userService: UserService, private tokenStorage: TokenStorageService, private resetPasswordService: ResetPasswordService,private router: Router) { }

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser()
    this.username = this.user.username;
    this.typeTransformateur = this.user.getTypeTransformateur;
    this.userService.findUserByName(this.tokenStorage.getUser().username).subscribe((res: any) => {
      this.data = res;
      this.transformateur = res.transformateur;
      this.typeTransformateur = res.typeTransformateur;
      this.id = res.id;
      this.roleUser = res.role.name;
      this.numTel = res.numeroTelephone;
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
    if (this.myForm.valid) {
    if (this.newPassword !== this.password) {
      this.resetPasswordService.resetPassword(this.username, this.password, this.newPassword).subscribe(
        success => {
          if (success){
            Swal.fire('Nouveau mot de passe enregistré !');
          }},
        err => {
          if (err){
            Swal.fire('L\' ancien mot de passe n\'est pas correct');
          }}
      );
    }
    else {
      Swal.fire('Le nouveau et l\'ancien mot de passe sont identiques');
    }
  }
  else {
    this.validateAllFields(this.myForm);
  }
  }
  selectUser(user): void {
    this.activeUser = user;
    console.log(this.activeUser);
  }
  validateAllFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }

}
