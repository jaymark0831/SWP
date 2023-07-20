import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonicSlides, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from 'src/app/components/login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  slideImages = [
    '../../../assets/1.jpg',
    '../../../assets/2.jpg',
    '../../../assets/3.jpg',
    '../../../assets/1.jpg',
    '../../../assets/2.jpg',
    '../../../assets/3.jpg'
  ];

  constructor(private authService: AuthService, 
    private router: Router,
    private modalController: ModalController
  ) { }

  ngOnInit() {
   
  }

  swiperModules = [IonicSlides];

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;

  logActiveIndex() {
    console.log(this.swiperRef?.nativeElement.swiper.activeIndex(2));
  }


  onBookAppointmentClick() {
    // Check if the user is logged in
    this.authService.isAuthenticated().subscribe(isLoggedIn => {
      console.log('Login:', isLoggedIn);
  
      if (isLoggedIn) {
        // User is logged in, redirect to "bookappointment" page
        this.router.navigate(['/menulogin/bookappointment']);
      } else {
        // User is not logged in, open the login modal
        this.openLoginModal();
      }
    });
  }
  


  async openLoginModal() {
    const modal = await this.modalController.create({
      component: LoginComponent,
      cssClass: 'modaldesign'
    });
    return await modal.present();
  }

}
