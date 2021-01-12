import {Component, OnInit, Input} from '@angular/core';
import {TypeTransformateurService} from '../../_services/type-transformateur.service';
import {AuthService} from '../../_services/auth.service';
import {TypeTransformateurs} from '../../_classes/type-transformateurs';
import {TopbarService} from '../../_services/topbar.service';
import {CustomValidationService} from '../../_services/custom-validation.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from "../../_services/user.service";

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
  myForm: FormGroup;

  constructor(private _fb: FormBuilder, private customValidator: CustomValidationService, private authService: AuthService, private typeTransformateurService: TypeTransformateurService, private userService: UserService, public topBarService: TopbarService) {
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
      validator: this.customValidator.passwordMatchValidator('password', 'confPassword')
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
        alert('Compte crée. Veuillez contacter l\'administrateur pour l\'activer');
      },
      err => {
        this.errorMessage = err.error.message;
        alert(this.errorMessage);
        this.isSignUpFailed = true;
      }
    );
  }

  get numSiret(): FormGroup{
    const  temp = this.myForm.controls.siret as FormGroup;
    return temp;
  }

  get username(): AbstractControl {
    return this.myForm.get('username');
  }

  get password(): AbstractControl {
    return this.myForm.get('password');
  }
  get confiPassword(): AbstractControl {
    return this.myForm.get('confPassword');
  }

}
