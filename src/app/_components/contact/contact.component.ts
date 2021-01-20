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

  constructor(private _fb: FormBuilder, private tokenService: TokenStorageService, private sendEmailService: SendEmailService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenService.getToken() == null || this.tokenService.getToken() === undefined || this.tokenService.getToken().length === 0) {
      this.areShown = true;
    }
    const reg = '(0)[1-9][0-9]{8}';
    this.myForm = this._fb.group({
      username: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required, Validators.pattern(reg)]],
      objet: [null, Validators.required],
      description: [null,Validators.required]
    });
  }
  get username(): AbstractControl {
    return this.myForm.get('username');
  }

  onSubmit(): void {
    if (!this.areShown) {
      this.form.userName = this.tokenService.getUser().userName;
      this.phone = this.tokenService.getUser().numeroTelephone;
    }
    const emailAdress: string = this.form.userName;
    const objet: string = this.objet;
    const phone: string = this.phone;
    const email: string = this.description;

    this.sendEmailService.sendContactEmail(emailAdress, objet, phone, email).subscribe(success => {
      if (this.form.userName.indexOf(emailAdress) !== -1) {
        if (success) {
          this.router.navigate(['/success'], {
            queryParams: {
              title: 'Vérifiez vos mails !',
              text: 'Vérifiez vos mails (et vos spams !) un mail pour réinitialiser votre mot de passe vous a été envoyé !'
            }
          });
        }
      }
    });
  }

  get numPhone(): AbstractControl {
    return this.myForm.get('phone');
  }
  get objt(): AbstractControl {
    return this.myForm.get('objet');
  }
  get desc(): AbstractControl {
    return this.myForm.get('description');
  }
}



