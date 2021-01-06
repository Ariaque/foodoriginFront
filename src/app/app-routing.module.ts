import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './_components/home/home.component';

import {LoginComponent} from './_components/login/login.component';
import {JoinComponent} from './_components/join/join.component';
import {FormUserComponent} from './_components/form-user/form-user.component';
import {UserValidationComponent} from './_components/user-validation/user-validation.component';
import {ForgotPasswordComponent} from './_components/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './_components/reset-password/reset-password.component';
import {SuccessPagecomponent} from './_components/success-page/success-pagecomponent';
import {ErrorPageComponent} from './_components/error-page/error-page.component';



const routes: Routes = [
  {path: '', redirectTo: '/accueil', pathMatch: 'full'},
  {path: 'join', component: JoinComponent},
  {path: 'accueil', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'user', component: FormUserComponent},
  {path: 'userValidation', component: UserValidationComponent},
  {path: 'forgotPassword', component: ForgotPasswordComponent},
  {path: 'resetPassword', component: ResetPasswordComponent},
  {path: 'success', component: SuccessPagecomponent},
  {path: 'error', component: ErrorPageComponent}
];
export const appRouting = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
