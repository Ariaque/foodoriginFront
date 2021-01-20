import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../_services/token-storage.service';
import {UserService} from '../../_services/user.service';
import {SendEmailService} from '../../_services/send-email.service';
import {Router} from '@angular/router';

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

  constructor( private tokenService: TokenStorageService, private sendEmailService: SendEmailService, private router: Router) { }

  ngOnInit(): void {
    if (this.tokenService.getToken() == null || this.tokenService.getToken() === undefined || this.tokenService.getToken().length === 0) {
      this.areShown = true;
    }
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

}
