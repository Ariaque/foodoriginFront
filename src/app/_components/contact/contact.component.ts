import { Component, OnInit, Input } from '@angular/core';
import {TokenStorageService} from '../../_services/token-storage.service';
import {UserService} from '../../_services/user.service';
import {SendEmailService} from '../../_services/send-email.service';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

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
    if (this.tokenService.getToken() == null || this.tokenService.getToken() === undefined || this.tokenService.getToken().length === 0) {
      this.areShown = true;
    }
    const reg = '(0)[1-9][0-9]{8}';
    this.myForm = this._fb.group({
      username: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.pattern(reg)]],
      objet: [null, Validators.required],
      description: [null, Validators.required]
    });
    if (!this.areShown) {
      this.form.username = this.tokenService.getUser().username;
      this.myForm.controls.username.disable();
      this.myForm.controls.phone.disable();
      this.userService.findUserByName(this.form.username).subscribe((res: any) => {
        this.phone = res.numeroTelephone;
      });

    }
  }
  get username(): AbstractControl {
    return this.myForm.get('username');
  }

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
                title: 'Envoi réussi !',
                text: 'Votre message a bien été pris en compte, nous reviendrons vers vous dès que possible !'
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

  get numPhone(): AbstractControl {
    return this.myForm.get('phone');
  }
  get obj(): AbstractControl {
    return this.myForm.get('objet');
  }
  get desc(): AbstractControl {
    return this.myForm.get('description');
  }
}



