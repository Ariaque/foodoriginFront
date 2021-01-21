import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../_services/auth.service';
import {TokenStorageService} from '../../_services/token-storage.service';
import {TopbarService} from '../../_services/topbar.service';
import {Router} from '@angular/router';
import {UserService} from "../../_services/user.service";
import {OrigineDenree} from "../../_classes/origine-denree";
import {User} from "../../_classes/user";

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

  constructor(private router: Router, private authService: AuthService, private tokenStorage: TokenStorageService, public topBarService: TopbarService,
              public userService: UserService) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }


  onSubmit(): void {
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
              this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect !';
              this.isLoginFailed = true;
              this.alert = true;
            });
        }
        else {
          this.errorMessage = 'Le compte n\'est pas activé !';
          this.isLoginFailed = true;
          this.alert = true;
        }
      }
      else {
          this.errorMessage = 'Ce compte n\'existe pas !';
          this.isLoginFailed = true;
          this.alert = true;
      }
    });
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

}
