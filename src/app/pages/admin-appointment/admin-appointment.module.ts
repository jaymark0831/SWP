import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminAppointmentPageRoutingModule } from './admin-appointment-routing.module';

import { AdminAppointmentPage } from './admin-appointment.page';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminAppointmentPageRoutingModule,
    AngularFirestoreModule
  ],
  declarations: [AdminAppointmentPage]
})
export class AdminAppointmentPageModule {}
