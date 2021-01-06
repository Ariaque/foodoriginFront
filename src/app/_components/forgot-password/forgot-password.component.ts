import { Component, OnInit } from '@angular/core';
import {SendResetPassordEmailService} from '../../_services/send-reset-passord-email.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  form: any = {};
  email: string;
  constructor(private router: Router, private sendResetPassordEmailService: SendResetPassordEmailService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.sendResetPassordEmailService.sendEmail(this.email).subscribe(success => {
      if (success){
        this.router.navigate(['/success'], { queryParams: { title: 'Vérifiez vos mails !', text: 'Vérifiez vos mails (et vos spams !) un mail pour réinitialiser votre mot de passe vous a été envoyé !' } });
      }});
  }

}
