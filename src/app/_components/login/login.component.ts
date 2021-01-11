import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../_services/auth.service';
import {TokenStorageService} from '../../_services/token-storage.service';
import {TopbarService} from '../../_services/topbar.service';
import {Router} from '@angular/router';

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
  @Input()
  signInError : string;

  constructor(private router: Router, private authService: AuthService, private tokenStorage: TokenStorageService, public topBarService: TopbarService) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }


  onSubmit(): void {
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
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.alert = true;
      }
    );
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
