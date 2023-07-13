import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminAnnouncementPageRoutingModule } from './admin-announcement-routing.module';

import { AdminAnnouncementPage } from './admin-announcement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminAnnouncementPageRoutingModule
  ],
  declarations: [AdminAnnouncementPage]
})
export class AdminAnnouncementPageModule {}
