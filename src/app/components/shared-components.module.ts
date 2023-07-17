import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderLoginComponent } from './header-login/header-login.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarComponent } from './calendar/calendar.component';



@NgModule({
  declarations: [
    HeaderComponent, 
    HeaderLoginComponent, 
    FooterComponent,
    LoginComponent,
    SignupComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    HeaderLoginComponent, 
    FooterComponent,
    LoginComponent,
    SignupComponent,
    ReactiveFormsModule,
    CalendarComponent
  ]
})
export class SharedComponentsModule { }
