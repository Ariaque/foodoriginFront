import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './_components/home/home.component';

import {LoginComponent} from './_components/login/login.component';
import {JoinComponent} from './_components/join/join.component';
import {FormUserComponent} from './_components/form-user/form-user.component';
import {UserValidationComponent} from './_components/user-validation/user-validation.component';
import {ForgotPasswordComponent} from './_components/forgot-password/forgot-password.component';
import {SuccessPageComponent} from './_components/success-page/success-page.component';
import {ErrorPageComponent} from './_components/error-page/error-page.component';
import {NotFoundComponent} from './_components/not-found/not-found.component';
import { ProfilComponent } from './_components/profil/profil.component';
import { ContactComponent } from './_components/contact/contact.component';
import {PlaceholderPageComponent} from './_components/placeholder-page/placeholder-page.component';



const routes: Routes = [
  {path: '', redirectTo: '/accueil', pathMatch: 'full'},
  {path: 'join', component: JoinComponent},
  {path: 'accueil', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'user', component: FormUserComponent},
  {path: 'userValidation', component: UserValidationComponent},
  {path: 'forgotPassword', component: ForgotPasswordComponent},
  {path: 'success', component: SuccessPageComponent},
  {path: 'error', component: ErrorPageComponent},
  {path: 'profil', component: ProfilComponent},
  {path: '404', component: NotFoundComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'soon', component: PlaceholderPageComponent},
  {path: '**', redirectTo: '/404'}
];
export const appRouting = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
