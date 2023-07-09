import { Component, HostListener, OnInit } from '@angular/core';
import { MenuController, Platform, ModalController } from '@ionic/angular';
import { LoginComponent } from 'src/app/components/login/login.component';
import { SignupComponent } from 'src/app/components/signup/signup.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor (
    private menuCtrl: MenuController, 
    private plt: Platform, 
    private modalController: ModalController
  ) { }

  // Open the login modal
  async openLoginModal() {
    const modal = await this.modalController.create({
      component: LoginComponent,
      cssClass: 'modaldesign'
    });
    return await modal.present();
  }

  // Open the signup modal
  async openSignupModal() {
    const modal = await this.modalController.create({
      component: SignupComponent,
      cssClass: 'signupmodaldesign'
    });
    return await modal.present();
  }

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
    }
    // {
    //   title: 'Login',
    //   icon: '',
    //   click: () => {
    //     return this.openLoginModal();
    //   }
    // },
    // {
    //   title: 'Book Now',
    //   icon: '',
    //   path: '/signup'
    // }

  ];

  title = 'Home';

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
