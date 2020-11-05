import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Composants/home/home.component';
import { TopbarComponent } from './Composants/topbar/topbar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import { SignUpComponent } from './Composants/sign-up/sign-up.component';
import { SignInComponent } from './Composants/sign-in/sign-in.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopbarComponent,
    SignUpComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
