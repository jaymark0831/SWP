import { Component, HostListener, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
// Side-menu content
  menuItems = [
    {
      title: 'Home',
      icon: 'home',
      path: '/'
    },
    {
      title: 'Services',
      icon: 'book',
      path: '/services'
    },
    {
      title: 'Announcements',
      icon: 'newspaper',
      path: '/announcements'
    },
    {
      title: 'Appointment',
      icon: 'calendar',
      path: '/appointment'
    },
    {
      title: 'Reservation',
      icon: 'calendar',
      path: '/reservation'
    },
    {
      title: 'Account',
      icon: 'person',
      path: '/account'
    },
    {
      title: 'Logout',
      icon: 'log-out',
      path: './login'
    }
  ];

  title = 'Home';

  constructor(private menuCtrl: MenuController, private plt: Platform) { }

  ngOnInit() {
    const width = this.plt.width();
    this.toggleMenu(width);
  }

  setTitle(title: any) {
    this.title = title;
  }

  // Hide side-menu in desktop view
  toggleMenu(width: any) {
    if(width > 820) {
      this.menuCtrl.enable(false, 'myMenu');
    } else {
      this.menuCtrl.enable(true, 'myMenu');
    }
  }

  // disable slide side-menu when desktop view
  @HostListener('window:resize', ['$event'])
  private onResize(event: any) {
    const newWidth = event.target.innerWidth;
    this.toggleMenu(newWidth);
  }

}
