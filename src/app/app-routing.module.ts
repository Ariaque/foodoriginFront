import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Composants/home/home.component';
import { LoginComponent } from './Composants//login/login.component';
import { JoinComponent } from './Composants/join/join.component';
//import {TestLinkBackComponent} from './Composants/test-link-back/test-link-back.component';
import { FormUserComponent } from './Composants//form-user/form-user.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'join', component: JoinComponent},


  { path: '', redirectTo: '/first', pathMatch: 'full' },
  { path: 'accueil', component:  HomeComponent},
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
