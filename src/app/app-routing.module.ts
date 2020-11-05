import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Composants/home/home.component';
import { SignInComponent } from './Composants/sign-in/sign-in.component';
import { SignUpComponent } from './Composants/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo: '/first', pathMatch: 'full' },
  { path: 'accueil', component:  HomeComponent},
  { path: 'rejoindre', component:  SignUpComponent},
  { path: 'connexion', component: SignInComponent},
];

export const appRouting = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
