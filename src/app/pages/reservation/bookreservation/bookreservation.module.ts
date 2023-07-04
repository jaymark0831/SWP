import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookreservationPageRoutingModule } from './bookreservation-routing.module';

import { BookreservationPage } from './bookreservation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookreservationPageRoutingModule
  ],
  declarations: [BookreservationPage]
})
export class BookreservationPageModule {}
