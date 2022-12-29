import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { PaymentsModule } from './payments/payments.module';
import { AccountService } from './services/account/account.service';
import { AuthService } from './services/auth/auth.service';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginModule } from './login/login.module';
import {MatCardModule} from '@angular/material/card';

import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent
   ],
  imports: [
    FormsModule,
    LoginModule,
    BrowserModule,
    MatCardModule,
    PaymentsModule,
    MatButtonModule,
    MatDialogModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService, AccountService, { provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
