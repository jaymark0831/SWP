import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  menuItems = [
    {
      title: 'Dashboard',
      icon: 'home',
      path: '/dashboard/admin-dashboard'
    },
    {
      title: 'Appointment',
      icon: 'calendar',
      path: '/dashboard/admin-appointment'
    },
    {
      title: 'Reservation',
      icon: 'calendar',
      path: '/dashboard/admin-reservation'
    },
    {
      title: 'Services',
      icon: 'book',
      path: '/dashboard/admin-services'
    },
    {
      title: 'Announcement',
      icon: 'newspaper',
      path: '/dashboard/admin-announcement'
    },
    {
      title: 'Accounts',
      icon: 'person',
      path: '/dashboard/admin-accounts'
    },
    {
      title: 'Reports',
      icon: 'book-outline',
      path: '/dashboard/admin-reports'
    }
  ];

  title = 'Dashboard';

  setTitle(title: any) {
    this.title = title;
  }

  constructor() { }

  ngOnInit() {
  }

}
