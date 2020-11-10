import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './_components/home/home.component';

import { LoginComponent } from './_components/login/login.component';
import { JoinComponent } from './_components/join/join.component';
import { FormUserComponent } from './_components/form-user/form-user.component';
//import {TestLinkBackComponent} from './_components/test-link-back/test-link-back.component';


const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  {path: 'join', component: JoinComponent},
  { path: 'accueil', component:  HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'user', component: FormUserComponent},

];

export const appRouting = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
