import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../_services/auth.service';
import {TokenStorageService} from '../../_services/token-storage.service';
import {TopbarService} from '../../_services/topbar.service';
import {Router} from '@angular/router';
import {UserService} from "../../_services/user.service";
import {OrigineDenree} from "../../_classes/origine-denree";
import {User} from "../../_classes/user";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {bad_login, inactive_account} from "../../../global";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  alert:boolean = false;
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  mail: string;
  @Input()
  signInError: string;
  FormLogin: FormGroup;

  constructor(private _fb: FormBuilder, private router: Router, private authService: AuthService, private tokenStorage: TokenStorageService, public topBarService: TopbarService,
              public userService: UserService) {
  }

  ngOnInit(): void {
    this.FormLogin = this._fb.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    })
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }


  onSubmit(): void {
    if (this.FormLogin.valid) {
    this.userService.findUserByName(this.form.username).subscribe((res: any) => {
      if (res != null) {
        if (res.isEnabled) {
          this.authService.login(this.form).subscribe(
            data => {
              this.tokenStorage.saveToken(data.accessToken);
              this.tokenStorage.saveUser(data);

              this.isLoginFailed = false;
              this.isLoggedIn = true;
              this.roles = this.tokenStorage.getUser().roles;
              this.topBarService.updateStatus();
              this.router.navigate(['/accueil']);
              this.alert = false;

            },
            err => {
              this.errorMessage = bad_login;
              this.isLoginFailed = true;
              this.alert = true;
            });
        }
        else {
          this.errorMessage = inactive_account;
          this.isLoginFailed = true;
          this.alert = true;
        }
      }
      else {
          this.errorMessage = bad_login;
          this.isLoginFailed = true;
          this.alert = true;
      }
    });
   }
   else {
    this.validateAllFields(this.FormLogin);
  }
  }
  closeAlert(){
    this.alert = false;
  }

  reloadPage(): void {
    window.location.reload();
  }

  loadPasswordForgottenPage(): void {
    this.router.navigate(['/forgotPassword']);
  }

  get username(): AbstractControl {
    return this.FormLogin.get('username');
  }

  get password(): AbstractControl {
    return this.FormLogin.get('password');
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
