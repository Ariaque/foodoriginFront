import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './_components/home/home.component';

import {LoginComponent} from './_components/login/login.component';
import {JoinComponent} from './_components/join/join.component';
import {FormUserComponent} from './_components/form-user/form-user.component';
import {UserValidationComponent} from './_components/user-validation/user-validation.component';


const routes: Routes = [
  {path: '', redirectTo: '/accueil', pathMatch: 'full'},
  {path: 'join', component: JoinComponent},
  {path: 'accueil', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'user', component: FormUserComponent},
  {path: 'userValidation', component: UserValidationComponent},
];

export const appRouting = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
