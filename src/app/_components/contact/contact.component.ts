import { Component, OnInit, Input } from '@angular/core';
import {TokenStorageService} from '../../_services/token-storage.service';
import {UserService} from '../../_services/user.service';
import {SendEmailService} from '../../_services/send-email.service';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {contact_text, contact_title, regex_email, regex_phone_number, regex_white_space} from '../../../global';

/**
 * Component that represents the "Contact" page
 */
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  form: any = {};
  description: string;
  objet: string;
  phone: string;
  areShown: boolean;
  @Input()
  myForm: FormGroup;

  constructor(private _fb: FormBuilder, private tokenService: TokenStorageService, private sendEmailService: SendEmailService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    window.scroll(0, 0);
    // Defines if the page is shown when a user is connected or not
    if (this.tokenService.getToken() == null || this.tokenService.getToken() === undefined || this.tokenService.getToken().length === 0) {
      this.areShown = true;
    }
    // Creates the form group
    this.myForm = this._fb.group({
      username: [null, [Validators.required, Validators.pattern(regex_email)]],
      phone: [null, [Validators.required, Validators.pattern(regex_phone_number)]],
      objet: [null, [Validators.required, Validators.pattern(regex_white_space)]],
      description: [null, [Validators.required, Validators.pattern(regex_white_space)]]
    });
    // Initializes attributes if the user is connected
    if (!this.areShown) {
      this.form.username = this.tokenService.getUser().username;
      this.myForm.controls.username.disable();
      this.myForm.controls.phone.disable();
      this.userService.findUserByName(this.form.username).subscribe((res: any) => {
        this.phone = res.numeroTelephone;
      });
    }
  }

  /**
   * Method called at the click on the "Envoyer" button: checks the validation rules and send a mail to administrator
   */
  onSubmit(): void {
    if (this.myForm.valid) {
      const emailAdress: string = this.form.username;
      const objet: string = '[FoodOrigin-Contact] ' + this.objet;
      const phone: string = this.phone;
      const message: string = this.description;

      this.sendEmailService.sendContactEmail(emailAdress, objet, phone, message).subscribe(success => {
        if (this.form.username.indexOf(emailAdress) !== -1) {
          if (success) {
            this.router.navigate(['/success'], {
              queryParams: {
                title: contact_title,
                text: contact_text
              }
            });
          }
        }
      });
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

  /**
   * Get value in "Votre adresse mail" field
   */
  get username(): AbstractControl {
    return this.myForm.get('username');
  }
  /**
   * Get value in "Votre numéro de téléphone" field
   */
  get numPhone(): AbstractControl {
    return this.myForm.get('phone');
  }
  /**
   * Get value in "Objet" field
   */
  get obj(): AbstractControl {
    return this.myForm.get('objet');
  }
  /**
   * Get value in "Votre message" field
   */
  get desc(): AbstractControl {
    return this.myForm.get('description');
  }
}



