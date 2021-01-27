import { Component, Input, OnInit } from '@angular/core';
import {UserService} from '../../_services/user.service';
import {Transformateur} from '../../_classes/transformateur';
import {TokenStorageService} from '../../_services/token-storage.service';
import {TypeTransformateur} from '../../_classes/type-transformateur';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ResetPasswordService} from '../../_services/reset-password.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {bad_old_password, new_pass_changed, new_pass_is_old_pass} from '../../../global';

/**
 * Component that represents the success page
 */

@Component({
  selector: 'app-profile',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  @Input()
  form: any = {};
  user: any;
  data: any;
  username: string;
  roleUser: string;
  transformateur: Transformateur;
  typeTransformateur: string;
  newPassword: string;
  password: string;
  numTel: string;
  myForm: FormGroup;
  id: number;

  constructor(private _fb: FormBuilder, private userService: UserService, private tokenStorage: TokenStorageService, private resetPasswordService: ResetPasswordService,private router: Router) { }

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser();
    this.username = this.user.username;
    this.typeTransformateur = this.user.getTypeTransformateur;
    // Retrieves the information of the logged-in user
    this.userService.findTransformateurByUser(this.tokenStorage.getUser().username).subscribe((res: Transformateur) => {
      this.transformateur = res;
    });
    this.userService.findUserInfosByName(this.tokenStorage.getUser().username).subscribe((res: any) => {
      this.id = res.id;
      this.roleUser = res.role;
      this.numTel = res.phoneNumber;
      this.typeTransformateur = res.typeTransformateur;
    });
    // Creates the form group
    this.myForm = this._fb.group({
      password: [null, Validators.required],
      newPassword: [null, Validators.required]
    });
  }

  /**
   * Get value in "Ancien mot de passe" field
   */
  get oldPsd(): AbstractControl {
    return this.myForm.get('password');
  }
  /**
   * Get value in "Nouveau mot de passe" field
   */
  get newPsd(): AbstractControl {
    return this.myForm.get('newPassword');
  }
  /**
   * Method called at the click on the "Changer votre mot de passe" button: checks the validation rules and saves the new password
   */
  onSubmit(): void {
    if (this.myForm.valid) {
      if (this.newPassword !== this.password) {
        this.resetPasswordService.resetPassword(this.username, this.password, this.newPassword).subscribe(
          success => {
            if (success){
              Swal.fire(new_pass_changed);
            }},
          err => {
            if (err){
              Swal.fire(bad_old_password);
            }}
        );
      }
      else {
        Swal.fire(new_pass_is_old_pass);
      }
    }
    else {
      this.validateAllFields(this.myForm);
    }
  }

  /**
   * Checks if all fields in a form follow the validation rules
   * @param formGroup
   */
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
