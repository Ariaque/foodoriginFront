import {Component, Input, OnInit} from '@angular/core';
import {SendEmailService} from '../../_services/send-email.service';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../_services/user.service';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../../_classes/user';
import {
  inactive_account_change_password,
  regex_email,
  reset_password_text,
  reset_password_title,
  problem_mail
} from '../../../global';

/**
 * Component that represents the "Mot de passe oublié" page when a user click on "Mot de passe oublié?" button
 */
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  form: any = {};
  email: string;
  alert: boolean;
  erreurMessage: string;
  @Input()
  myForm: FormGroup;
  usersSource: MatTableDataSource<User>;
  data: any;
  usersname: string[] = [];
  disabled: boolean;


  constructor(private userService: UserService, private _fb: FormBuilder, private router: Router, private sendResetPassordEmailService: SendEmailService) {
  }

  /**
   * Get value in "Mail" field
   */
  get mail(): AbstractControl {
    return this.myForm.get('mail');
  }

  ngOnInit(): void {
    // Creates the form group
    this.myForm = this._fb.group({
      mail: [null, [Validators.required, Validators.pattern(regex_email)]]
    });
    /*this.userService.findAll().subscribe(data => {
      this.usersSource = new MatTableDataSource<User>(data);
      for (let i = 0; i < this.usersSource.data.length; i++) {
        this.usersname.push(data[i].getUsername);
      }
    });*/

  }

  /**
   * Method called at the click on the "Valider" button: checks the validation rules and send a mail to the user to reset his password
   */
  onSubmit(): void {
    this.disabled = true;
    if (this.myForm.valid) {
      this.userService.findUserActivationByName(this.email).subscribe((res: any) => {
        if (res != null) {
          if (res == false) {
            this.alert = true;
            this.erreurMessage = inactive_account_change_password;
            this.disabled = false;
          }
          else {
            this.sendResetPassordEmailService.sendResetEmail(this.email).subscribe(success => {
              this.router.navigate(['/success'], { queryParams: { title: reset_password_title, text: reset_password_text } });
              this.disabled = false;
            });
          }
        }
        else {
          this.alert = true;
          this.erreurMessage = problem_mail;
          this.disabled = false;
        }
      });
    }
    else {
      this.validateAllFields(this.myForm);
      this.disabled = false;
    }
  }

  /**
   * Removes the error message
   */
  closeAlert(): void {
    this.alert = false;
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
