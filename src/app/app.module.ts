import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';


import { HomeComponent } from './_components/home/home.component';
import { TopbarComponent } from './_components/topbar/topbar.component';
import {MatTabsModule} from '@angular/material/tabs';
import { FormUserComponent } from './_components/form-user/form-user.component';
import { LoginComponent } from './_components/login/login.component';
import { JoinComponent } from './_components/join/join.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

    JoinComponent,
    AppComponent,
    HomeComponent,
    TopbarComponent,
    FormUserComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
