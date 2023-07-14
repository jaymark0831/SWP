import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminReservationPage } from './admin-reservation.page';

const routes: Routes = [
  {
    path: '',
    component: AdminReservationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminReservationPageRoutingModule {}
