import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../_services/auth.service';
import {TokenStorageService} from '../../_services/token-storage.service';
import {TopbarService} from '../../_services/topbar.service';
import {Router} from '@angular/router';
import {UserService} from '../../_services/user.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {bad_login, inactive_account, regex_email} from '../../../global';

/**
 * Component that represents the "Connexion" page
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  alert: boolean = false;
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  @Input()
  signInError: string;
  FormLogin: FormGroup;

  constructor(private _fb: FormBuilder, private router: Router, private authService: AuthService, private tokenStorage: TokenStorageService, public topBarService: TopbarService,
              public userService: UserService) {
  }

  /**
   * Get value in "Email" field
   */
  get username(): AbstractControl {
    return this.FormLogin.get('username');
  }

  /**
   * Get value in "Mot de passe" field
   */
  get password(): AbstractControl {
    return this.FormLogin.get('password');
  }

  ngOnInit(): void {
    // Creates the form group
    this.FormLogin = this._fb.group({
      username: [null, [Validators.required, Validators.pattern(regex_email)]],
      password: [null, Validators.required]
    });
    // If a user is already logged in, he is redirected to the home page
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.router.navigate(['/accueil']);
    }
  }

  /**
   * Method called at the click on the "Se connecter" button: checks the validation rules and connects the user
   */
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
          } else {
            this.errorMessage = inactive_account;
            this.isLoginFailed = true;
            this.alert = true;
          }
        } else {
          this.errorMessage = bad_login;
          this.isLoginFailed = true;
          this.alert = true;
        }
      });
    } else {
      this.validateAllFields(this.FormLogin);
    }
  }

  /**
   * Removes the error message
   */
  closeAlert() {
    this.alert = false;
  }

  /**
   * Redirects the user if he clicks on "Mot de passe oublié?" button
   */
  loadPasswordForgottenPage(): void {
    this.router.navigate(['/forgotPassword']);
  }

  /**
   * Checks if all fields in a form follow the validation rules
   * @param formGroup
   */
  validateAllFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }
}
