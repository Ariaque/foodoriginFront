import {Component, OnInit, Input} from '@angular/core';
import {TypeTransformateurService} from '../../_services/type-transformateur.service';
import {AuthService} from '../../_services/auth.service';
import {TypeTransformateurs} from '../../_classes/type-transformateurs';
import {TopbarService} from '../../_services/topbar.service';
import {CustomValidationService} from '../../_services/custom-validation.service';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css'],
})
export class JoinComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  type: TypeTransformateurs[];
  siret: number;
  confPassword: string;
  selectedType: TypeTransformateurs;
  @Input()
  myForm: FormGroup

  constructor(private _fb: FormBuilder,private customValidator: CustomValidationService, private authService: AuthService, private typeTransformateurService: TypeTransformateurService, public topBarService: TopbarService) {
  }

  ngOnInit(): void {
    this.typeTransformateurService.findAll().subscribe((result) => {
      this.type = result;
    });
    this.myForm = this._fb.group({
      username: [null, [Validators.required, Validators.email]],
      siret: [null, [Validators.required, Validators.pattern('^[0-9]{14}$')]],
      password: [null, Validators.required],
      confPassword: [null, Validators.required],
    }, {
      validator: this.customValidator.passwordMatchValidator("password","confPassword")
    });
  }

  onTypeTransformateurSelected(val: any): void {
    this.selectedType = val;
  }

  onSubmit(): void {
    this.authService.register(this.form, this.selectedType, this.siret).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  get numSiret(){
    const  temp = <FormGroup>this.myForm.controls.siret;
    return temp;
  }

  get username() {
    return this.myForm.get('username');
  }

  get password() {
    return this.myForm.get('password');
  }
  get confiPassword() {
    return this.myForm.get('confPassword');
  }

}
