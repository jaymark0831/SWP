import { Component, OnInit, HostListener } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menulogin',
  templateUrl: './menulogin.page.html',
  styleUrls: ['./menulogin.page.scss'],
})
export class MenuloginPage implements OnInit {
  // Side-menu content
  menuItems = [
    {
      title: 'Home',
      icon: 'home',
      path: '/menulogin/home'
    },
    {
      title: 'Services',
      icon: 'book',
      path: '/menulogin/services'
    },
    {
      title: 'Announcements',
      icon: 'newspaper',
      path: '/menulogin/announcements'
    },
    {
      title: 'Appointment',
      icon: 'calendar',
      path: '/menulogin/appointment'
    },
    {
      title: 'Reservation',
      icon: 'calendar',
      path: '/menulogin/reservation'
    },
    {
      title: 'Account',
      icon: 'person',
      path: '/menulogin/account'
    },
    {
      title: 'Logout',
      icon: 'log-out',
      path: ''
    }
  ];

  title = 'Home';

  constructor(private menuCtrl: MenuController, private plt: Platform, private authservice: AuthService, private router: Router) { }

  ngOnInit() {
    const width = this.plt.width();
    this.toggleMenu(width);
  }

  setTitle(title: any){
    this.title = title;
  }

  // Hide sidemenu in desktop view
  toggleMenu(width: any) {
    if(width > 820) {  
      this.menuCtrl.enable(false, 'myMenulogin');
    } else {
      this.menuCtrl.enable(true, 'myMenulogin');
    }
  } 

  // Disable slide sidemenu in desktop view
  @HostListener('window: resize', ['$event'])
  private onResize(event: any) {
    const newWidth = event.target.innerWidth;
    this.toggleMenu(newWidth);
  }
}
