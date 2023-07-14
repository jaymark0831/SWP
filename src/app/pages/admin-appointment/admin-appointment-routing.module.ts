import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminAppointmentPage } from './admin-appointment.page';

const routes: Routes = [
  {
    path: '',
    component: AdminAppointmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminAppointmentPageRoutingModule {}
