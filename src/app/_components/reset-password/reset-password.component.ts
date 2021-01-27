import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidationService} from '../../_services/custom-validation.service';
import {TokenValidityService} from '../../_services/token-validity.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ResetPasswordService} from '../../_services/reset-password.service';
import {reset_password_confirmed_text, reset_password_confirmed_title} from "../../../global";


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  form: any = {};
  myForm: FormGroup;
  newPasswordConfirmation: string;
  newPassword: string;
  isTokenAvailable: boolean;
  url: URL;
  id: string;
  token: string;

  constructor(private _fb: FormBuilder, private customValidator: CustomValidationService, private tokenValidityService: TokenValidityService, private resetPasswordService: ResetPasswordService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.url = new URL(window.location.href);
    this.id =  this.url.searchParams.get('id');
    this.token =  this.url.searchParams.get('token');
    this.tokenValidityService.checkTokenValidity(this.id, this.token).subscribe((result) => {
      this.isTokenAvailable = result;
      if (!this.isTokenAvailable) {
        this.router.navigate(['/error'], { queryParams: { title: 'Erreur', text: 'Le jeton de réinitialisation est invalide !' } });
      }
    });
    this.myForm = this._fb.group({
      newPassword: [null, Validators.required],
      newPasswordConfirmation: [null, Validators.required]
    }, {
      validator: this.customValidator.passwordMatchValidator('newPassword', 'newPasswordConfirmation')
    });
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      this.resetPasswordService.saveNewPassword(this.token, this.newPassword).subscribe(success => {
        if (success){
          this.router.navigate(['/success'], { queryParams: { title: reset_password_confirmed_title, text: reset_password_confirmed_text } });
        }});
    }
    else {
      this.validateAllFields(this.myForm);
    }
  }

  get password(): AbstractControl {
    return this.myForm.get('newPassword');
  }
  get confiPassword(): AbstractControl {
    return this.myForm.get('newPasswordConfirmation');
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
