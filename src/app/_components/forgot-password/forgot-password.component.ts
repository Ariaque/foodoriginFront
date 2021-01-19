import { Component, OnInit, Input } from '@angular/core';
import {SendResetPassordEmailService} from '../../_services/send-reset-passord-email.service';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../_services/user.service';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../../_classes/user';
import Swal from 'sweetalert2';


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


  constructor(private userService: UserService, private _fb: FormBuilder,private router: Router, private sendResetPassordEmailService: SendResetPassordEmailService) { }

  ngOnInit(): void {
    this.myForm = this._fb.group({
      mail: [null, [Validators.required, Validators.email]]
    });
    this.userService.findUsers().subscribe(data => {
      this.usersSource = new MatTableDataSource<User>(data);
      for (let i = 0; i < this.usersSource.data.length; i++) {
        this.usersname.push(data[i].getUsername) ;
      }
    });   
    
  }

  onSubmit(): void {
    if(this.usersname.indexOf(this.email) !== -1){
      this.sendResetPassordEmailService.sendEmail(this.email).subscribe(success => {
        if (success){
        this.router.navigate(['/success'], { queryParams: { title: 'Vérifiez vos mails !', text: 'Vérifiez vos mails (et vos spams !) un mail pour réinitialiser votre mot de passe vous a été envoyé !' } });
        }});
    } else {
      Swal.fire({title: "Votre mail n'existe pas!"});
      }
  }

  get mail(): AbstractControl {
    return this.myForm.get('mail');
  }
 
}
