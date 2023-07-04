import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservationPage } from './reservation.page';

const routes: Routes = [
  {
    path: '',
    component: ReservationPage
  },
  {
    path: 'bookreservation',
    loadChildren: () => import('./bookreservation/bookreservation.module').then( m => m.BookreservationPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationPageRoutingModule {}
