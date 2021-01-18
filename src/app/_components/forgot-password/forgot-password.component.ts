import { Component, OnInit, Input } from '@angular/core';
import {SendResetPassordEmailService} from '../../_services/send-reset-passord-email.service';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  form: any = {};
  email: string;
  @Input()
  myForm: FormGroup;

  constructor(private _fb: FormBuilder,private router: Router, private sendResetPassordEmailService: SendResetPassordEmailService) { }

  ngOnInit(): void {
    this.myForm = this._fb.group({
      mail: [null, [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    this.sendResetPassordEmailService.sendEmail(this.email).subscribe(success => {
      if (success){
        this.router.navigate(['/success'], { queryParams: { title: 'Vérifiez vos mails !', text: 'Vérifiez vos mails (et vos spams !) un mail pour réinitialiser votre mot de passe vous a été envoyé !' } });
      }});
  }

  get mail(): AbstractControl {
    return this.myForm.get('mail');
  }
}
