import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { IonicSlides } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  slideImages = [
    '../../../assets/home-cover1.png',
    '../../../assets/home-cover1.png',
    '../../../assets/home-cover1.png',
    '../../../assets/home-cover1.png',
    '../../../assets/home-cover1.png'
  ];

  constructor() { }

  ngOnInit() {}

  swiperModules = [IonicSlides];

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;

  logActiveIndex() {
    console.log(this.swiperRef?.nativeElement.swiper.activeIndex(2));
  }

}
