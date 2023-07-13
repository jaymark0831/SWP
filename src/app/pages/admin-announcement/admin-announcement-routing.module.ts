import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminAnnouncementPage } from './admin-announcement.page';

const routes: Routes = [
  {
    path: '',
    component: AdminAnnouncementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminAnnouncementPageRoutingModule {}
