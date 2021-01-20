import {Component, Input, OnInit} from '@angular/core';
import {SendEmailService} from '../../_services/send-email.service';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../_services/user.service';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../../_classes/user';


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
  usersSource: MatTableDataSource<User>;
  data: any;
  usersname: string[] = [];


  constructor(private userService: UserService, private _fb: FormBuilder, private router: Router, private sendResetPassordEmailService: SendEmailService) {
  }

  get mail(): AbstractControl {
    return this.myForm.get('mail');
  }

  ngOnInit(): void {
    const reg = '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$';
    this.myForm = this._fb.group({
      mail: [null, [Validators.required, Validators.pattern(reg)]]
    });
    this.userService.findAll().subscribe(data => {
      this.usersSource = new MatTableDataSource<User>(data);
      for (let i = 0; i < this.usersSource.data.length; i++) {
        this.usersname.push(data[i].getUsername);
      }
    });
  }

  onSubmit(): void {
    if (this.myForm.valid) {
      this.sendResetPassordEmailService.sendResetEmail(this.email).subscribe(success => {
        if (this.usersname.indexOf(this.email) !== -1) {
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

}
