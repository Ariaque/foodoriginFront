import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { JoinComponent } from './join/join.component';

import { HomeComponent } from './Composants/home/home.component';
import { SignUpComponent } from './Composants/sign-up/sign-up.component';
import { FormUserComponent } from './form-user/form-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  {path: 'join', component: JoinComponent},
  { path: 'accueil', component:  HomeComponent},
  { path: 'rejoindre', component:  SignUpComponent},
  {path: 'login', component: LoginComponent},
  {path: 'user', component: FormUserComponent},
];
export const appRouting = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
