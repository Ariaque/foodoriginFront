import {Component, OnInit, Input, Inject} from '@angular/core';
import {TypeTransformateurService} from '../../_services/type-transformateur.service';
import {AuthService} from '../../_services/auth.service';
import {TypeTransformateur} from '../../_classes/type-transformateur';
import {TopbarService} from '../../_services/topbar.service';
import {CustomValidationService} from '../../_services/custom-validation.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../_services/user.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {SendEmailService} from '../../_services/send-email.service';
import {
  account_created,
  mail_to_admin_obj,
  mail_to_admin_text,
  regex_email,
  regex_phone_number,
  regex_siret
} from '../../../global';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';

/**
 * Component that represents the "Rejoindre" page
 */
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
  animal: string;
  name: string;
  @Input()
  myForm: FormGroup;

  constructor(private _fb: FormBuilder, private customValidator: CustomValidationService, private authService: AuthService, private typeTransformateurService: TypeTransformateurService, private userService: UserService, public topBarService: TopbarService, private router: Router, private sendEmailService: SendEmailService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    // Recovers all TypeTransformateur
    this.typeTransformateurService.findAll().subscribe((result) => {
      this.type = result;
    });
    // Creates the form group
    this.myForm = this._fb.group({
      username: [null, [Validators.required, Validators.pattern(regex_email)]],
      siret: [null, [Validators.required, Validators.pattern(regex_siret)]],
      password: [null, Validators.required],
      confPassword: [null, Validators.required],
      selectedType: [null, Validators.required],
      numTelephone: [null, [Validators.required, Validators.pattern(regex_phone_number)]]
    }, {
      validator: this.customValidator.passwordMatchValidator('password', 'confPassword')
    });
  }

  /**
   * Get value in "Type Transformateur" field
   */
  onTypeTransformateurSelected(val: any): void {
    this.selectedType = val;
  }

  /**
   * Method called at the click on the "S'inscrire" button: checks the validation rules and saves the registration in the database
   */
  onSubmit(): void {
  if (this.myForm.valid) {
      /*const dialogRef = this.dialog.open(DialogTransformateurGroup, {
        width: '250px',
        data: {name: this.name, animal: this.animal},
    });
  
    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.animal = result;
    });  */
    this.authService.register(this.form, this.selectedType, this.siret, this.numTelephone).subscribe(
        data => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          Swal.fire(account_created);
          this.router.navigate(['/accueil']);
          this.sendEmailService.sendNotificationEmail(
            this.myForm.get('username').value, 
            mail_to_admin_obj, this.numTelephone, mail_to_admin_text)
            .subscribe();
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

  /**
   * Get value in "Siret" field
   */
  get numSiret(): FormGroup{
    const  temp = this.myForm.controls.siret as FormGroup;
    return temp;
  }

  /**
   * Get value in "Numéro de téléphone" field
   */
  get numTel(): FormGroup{
    const  temp = this.myForm.controls.numTelephone as FormGroup;
    return temp;
  }

  /**
   * Get value in "Email" field
   */
  get username(): AbstractControl {
    return this.myForm.get('username');
  }

  /**
   * Get value in "Mot de passe" field
   */
  get password(): AbstractControl {
    return this.myForm.get('password');
  }

  /**
   * Get value in "Confirmer mot de passe" field
   */
  get confiPassword(): AbstractControl {
    return this.myForm.get('confPassword');
  }

  /**
   * Get value in "Type transformateur" field
   */
  get typeTransformateur(): AbstractControl {
    return this.myForm.get('selectedType');
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


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'dialog-transformateurgroup',
  templateUrl: 'dialog.html',
})
export class DialogTransformateurGroup {
  constructor(
    public dialogRef: MatDialogRef<DialogTransformateurGroup>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

