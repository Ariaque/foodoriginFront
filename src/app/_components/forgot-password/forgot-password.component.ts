import { Component, OnInit, Input } from '@angular/core';
import {SendResetPassordEmailService} from '../../_services/send-reset-passord-email.service';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
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
  alert: boolean;
  erreurMessage: string;
  @Input()
  myForm: FormGroup;
  usersSource: MatTableDataSource<User>;
  data: any;
  usersname: string[] = [];


  constructor(private userService: UserService, private _fb: FormBuilder, private router: Router, private sendResetPassordEmailService: SendResetPassordEmailService) { }

  ngOnInit(): void {
    this.myForm = this._fb.group({
      mail: [null, [Validators.required, Validators.email]]
    });
    this.userService.findAll().subscribe(data => {
      this.usersSource = new MatTableDataSource<User>(data);
      for (let i = 0; i < this.usersSource.data.length; i++) {
        this.usersname.push(data[i].getUsername) ;
      }
    });

  }

  onSubmit(): void {
    this.userService.findUserByName(this.email).subscribe((res: any) => {
      if (res === null) {
        this.alert = true;
        this.erreurMessage = 'Cet email ne correspond à aucun utilisateur';
      }
      else if (!res.isEnabled) {
        this.alert = true;
        this.erreurMessage = 'Votre compte est désactivé, vous ne pouvez pas changer votre mot de passe';
      }
      else {
        this.sendResetPassordEmailService.sendEmail(this.email).subscribe(success => {
          this.router.navigate(['/success'], { queryParams: { title: 'Vérifiez vos mails !', text: 'Vérifiez vos mails (et vos spams !) un mail pour réinitialiser votre  mot de passe vous a été envoyé !' } });
        });
      }
    });
  }


  get mail(): AbstractControl {
    return this.myForm.get('mail');
  }

}
