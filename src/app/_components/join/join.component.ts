import {Component, OnInit, Input} from '@angular/core';
import {TypeTransformateurService} from '../../_services/type-transformateur.service';
import {AuthService} from '../../_services/auth.service';
import {TypeTransformateur} from '../../_classes/type-transformateur';
import {TopbarService} from '../../_services/topbar.service';
import {CustomValidationService} from '../../_services/custom-validation.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../_services/user.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2'
import {SendEmailService} from '../../_services/send-email.service';

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
  type: TypeTransformateur[];
  siret: number;
  numTelephone: string;
  confPassword: string;
  selectedType: TypeTransformateur;
  @Input()
  myForm: FormGroup;

  constructor(private _fb: FormBuilder, private customValidator: CustomValidationService, private authService: AuthService, private typeTransformateurService: TypeTransformateurService, private userService: UserService, public topBarService: TopbarService, private router: Router, private sendEmailService: SendEmailService) {
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
      selectedType: [null, Validators.required],
      numTelephone: [null, [Validators.required, Validators.pattern('(0)[1-9][0-9]{8}')]]
    }, {
      validator: this.customValidator.passwordMatchValidator('password', 'confPassword')
    });
  }

  onTypeTransformateurSelected(val: any): void {
    this.selectedType = val;
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      this.authService.register(this.form, this.selectedType, this.siret, this.numTelephone).subscribe(
        data => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          Swal.fire('Compte crée. Veuillez contacter l\'administrateur pour l\'activer');
          this.router.navigate(['/accueil']);
          this.sendEmailService.sendNotificationEmail(this.myForm.get('username').value, '[FoodOrigin-Demande d\'activation] Nouvelle inscription', this.numTelephone, 'Un nouvel utilisateur a créé un compte !' +  '\r\n' + '1/ Vérifiez qu\'il s\'est acquité de son paiement.' + '\r\n' + '2/ Connectez-vous à la plateforme FoodOrigin avec votre compte administrateur' + '\r\n' + '3/ Cliquez sur "Gestion des comptes" dans la barre de menu' + '\r\n' + '4/ Dans l\'interface de gestion des comptes, recherchez l\'utilisateur et cliquez sur "Activer"').subscribe();
        },
        err => {
          this.errorMessage = err.error.message;
          Swal.fire(this.errorMessage);
          this.isSignUpFailed = true;
        }
      );
    }
    else {
      this.validateAllFields(this.myForm);
    }
  }

  get numSiret(): FormGroup{
    const  temp = this.myForm.controls.siret as FormGroup;
    return temp;
  }

  get numTel(): FormGroup{
    const  temp = this.myForm.controls.numTelephone as FormGroup;
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

  get typeTransformateur(): AbstractControl {
    return this.myForm.get('selectedType');
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
