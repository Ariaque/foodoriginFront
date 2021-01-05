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
    console.log(this.email);
    this.sendResetPassordEmailService.sendEmail(this.email).subscribe();
    this.router.navigate(['/emailSent']);
  }


}
