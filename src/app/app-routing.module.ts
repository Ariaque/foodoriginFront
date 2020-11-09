import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { JoinComponent } from './join/join.component';

import { HomeComponent } from './Composants/home/home.component';
import { SignUpComponent } from './Composants/sign-up/sign-up.component';
//import {TestLinkBackComponent} from './Composants/test-link-back/test-link-back.component';
import { FormUserComponent } from './form-user/form-user.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'join', component: JoinComponent},


  { path: '', redirectTo: '/first', pathMatch: 'full' },
  { path: 'accueil', component:  HomeComponent},
  { path: 'rejoindre', component:  SignUpComponent},
  {path: 'login', component: LoginComponent},
//{path: 'testLinkBack', component: TestLinkBackComponent},
  {path: 'user', component: FormUserComponent},
];

export const appRouting = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
