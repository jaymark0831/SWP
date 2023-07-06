import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

import { BookreservationPageRoutingModule } from './bookreservation-routing.module';

import { BookreservationPage } from './bookreservation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookreservationPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [BookreservationPage]
})
export class BookreservationPageModule {}
