import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { JoinComponent } from './join/join.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon'



import { HomeComponent } from './Composants/home/home.component';
import { TopbarComponent } from './Composants/topbar/topbar.component';
import {MatTabsModule} from '@angular/material/tabs';
import { SignUpComponent } from './Composants/sign-up/sign-up.component';
import { FormUserComponent } from './form-user/form-user.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

    JoinComponent,
    AppComponent,
    HomeComponent,
    TopbarComponent,
    SignUpComponent,
    FormUserComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
