import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminReservationPageRoutingModule } from './admin-reservation-routing.module';

import { AdminReservationPage } from './admin-reservation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminReservationPageRoutingModule
  ],
  declarations: [AdminReservationPage]
})
export class AdminReservationPageModule {}
