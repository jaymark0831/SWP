import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input()
  title!: string;

  constructor(
    private modalController: ModalController
    ) { }

  ngOnInit() {}

  async openLoginModal() {
    const modal = await this.modalController.create({
      component: LoginComponent,
      cssClass: 'modaldesign'
    });
    return await modal.present();
  }

  // signup modal
  async openSignupModal() {
    const modal = await this.modalController.create({
      component: SignupComponent,
      cssClass: 'signupmodaldesign'
    });
    return await modal.present();
  }
  
}
