import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

import { ServicesPageRoutingModule } from './services-routing.module';

import { ServicesPage } from './services.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicesPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [ServicesPage]
})
export class ServicesPageModule {}
