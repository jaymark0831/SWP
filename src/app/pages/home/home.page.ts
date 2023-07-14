import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { IonicSlides } from '@ionic/angular';


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

  constructor() { }

  ngOnInit() {}

  swiperModules = [IonicSlides];

  // getLoopImages(): string[] {
  //   let currentIndex = 0;
  //   const loopImages = [];
  //   const loopLimit = 10;
  
  //   for (let i = 0; i < loopLimit; i++) {
  //     loopImages.push(this.slideImages[currentIndex]);
  //     currentIndex = (currentIndex + 1) % this.slideImages.length;
  //   }
    
  //   return loopImages;
  // }

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;

  logActiveIndex() {
    console.log(this.swiperRef?.nativeElement.swiper.activeIndex(2));
  }

}
