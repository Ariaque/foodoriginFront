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
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SuccessPageComponent } from './_components/success-page/success-page.component';
import { ErrorPageComponent } from './_components/error-page/error-page.component';
import { NotFoundComponent } from './_components/not-found/not-found.component';
import { ProfilComponent } from './_components/profil/profil.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './_components/confirmation-dialog/confirmation-dialog.component';
import { FooterBarComponent } from './_components/footer-bar/footer-bar.component';
import { ContactComponent } from './_components/contact/contact.component';
import { PlaceholderPageComponent } from './_components/placeholder-page/placeholder-page.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './_classes/token.interceptor';
import { ResetPasswordComponent } from './_components/reset-password/reset-password.component';
import { GroupTransformateurComponent } from './group-transformateur/group-transformateur.component';

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
    SuccessPageComponent,
    ErrorPageComponent,
    NotFoundComponent,
    ProfilComponent,
    ConfirmationDialogComponent,
    FooterBarComponent,
    ContactComponent,
    PlaceholderPageComponent,
    ResetPasswordComponent,
    GroupTransformateurComponent,
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
        MatDialogModule,
        MatFormFieldModule,
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
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
