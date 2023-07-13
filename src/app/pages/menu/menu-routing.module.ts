import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: '',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'services',
        loadChildren: () => import('../services/services.module').then( m => m.ServicesPageModule)
      },
      {
        path: 'announcements',
        loadChildren: () => import('../announcements/announcements.module').then( m => m.AnnouncementsPageModule)
      }
      // {
      //   path: 'appointment',
      //   loadChildren: () => import('../appointment/appointment.module').then( m => m.AppointmentPageModule)
      // },
      // {
      //   path: 'bookappointment',
      //   loadChildren: () => import('../appointment/bookappointment/bookappointment.module').then( m => m.BookappointmentPageModule)
      // },
      // {
      //   path: 'reservation',
      //   loadChildren: () => import('../reservation/reservation.module').then( m => m.ReservationPageModule)
      // },
      // {
      //   path: 'bookreservation',
      //   loadChildren: () => import('../reservation/bookreservation/bookreservation.module').then( m => m.BookreservationPageModule)
      // },
      // {
      //   path: 'account',
      //   loadChildren: () => import('../account/account.module').then( m => m.AccountPageModule)
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
