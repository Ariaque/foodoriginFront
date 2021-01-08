import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';


import {HomeComponent} from './_components/home/home.component';
import {TopbarComponent} from './_components/topbar/topbar.component';
import {MatTabsModule} from '@angular/material/tabs';
import {FormUserComponent} from './_components/form-user/form-user.component';
import {LoginComponent} from './_components/login/login.component';
import {JoinComponent} from './_components/join/join.component';
import {HttpClientModule} from '@angular/common/http';
import {UserValidationComponent} from './_components/user-validation/user-validation.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ForgotPasswordComponent } from './_components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './_components/reset-password/reset-password.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SuccessPagecomponent } from './_components/success-page/success-pagecomponent';
import { ErrorPageComponent } from './_components/error-page/error-page.component';
import { ProfileComponent } from './_components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    JoinComponent,
    AppComponent,
    HomeComponent,
    TopbarComponent,
    FormUserComponent,
    UserValidationComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SuccessPagecomponent,
    ErrorPageComponent,
    ProfileComponent,
  ],
    imports: [
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        FlexLayoutModule,
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        MatTabsModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatSelectModule,
        MatCheckboxModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
