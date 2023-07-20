import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuloginPage } from './menulogin.page';
import { AuthGuard } from 'src/app/services/auth.guard';
import { HomePage } from '../home/home.page';
import { BookappointmentPage } from '../appointment/bookappointment/bookappointment.page';

const routes: Routes = [
  {
    path: '',
    component: MenuloginPage,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: 'home',
            component: HomePage
          },
          {
            path: 'services',
            loadChildren: () => import('../services/services.module').then( m => m.ServicesPageModule)
          },
          {
            path: 'announcements',
            loadChildren: () => import('../announcements/announcements.module').then( m => m.AnnouncementsPageModule)
          },
          {
            path: 'appointment',
            loadChildren: () => import('../appointment/appointment.module').then( m => m.AppointmentPageModule)
          },
          {
            path: 'bookappointment',
            component: BookappointmentPage
          },
          {
            path: 'reservation',
            loadChildren: () => import('../reservation/reservation.module').then( m => m.ReservationPageModule)
          },
          {
            path: 'bookreservation',
            loadChildren: () => import('../reservation/bookreservation/bookreservation.module').then( m => m.BookreservationPageModule)
          },
          {
            path: 'account',
            loadChildren: () => import('../account/account.module').then( m => m.AccountPageModule)
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuloginPageRoutingModule {}
