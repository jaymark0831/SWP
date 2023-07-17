import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: 'admin-dashboard',
        loadChildren: () => import('../admin-dashboard/admin-dashboard.module').then( m => m.AdminDashboardPageModule)
      },
      {
        path: 'admin-appointment',
        loadChildren: () => import('../admin-appointment/admin-appointment.module').then( m => m.AdminAppointmentPageModule)
      },
      {
        path: 'admin-reservation',
        loadChildren: () => import('../admin-reservation/admin-reservation.module').then( m => m.AdminReservationPageModule)
      },
      {
        path: 'admin-services',
        loadChildren: () => import('../admin-services/admin-services.module').then( m => m.AdminServicesPageModule)
      },
      {
        path: 'admin-announcement',
        loadChildren: () => import('../admin-announcement/admin-announcement.module').then( m => m.AdminAnnouncementPageModule)
      },
      {
        path: 'admin-accounts',
        loadChildren: () => import('../admin-accounts/admin-accounts.module').then(m => m.AdminAccountsPageModule)
      },
      {
        path: 'admin-reports',
        loadChildren: () => import('../admin-reports/admin-reports.module').then( m => m.AdminReportsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
