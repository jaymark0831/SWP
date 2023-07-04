import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {
  // list of services
  servicesList = [
    {
      img: 'https://ionicframework.com/docs/img/demos/card-media.png',
      title: 'Catering'
    },
    {
      img: 'https://ionicframework.com/docs/img/demos/card-media.png',
      title: 'Attire'
    },
    {
      img: 'https://ionicframework.com/docs/img/demos/card-media.png',
      title: 'Flower Arrangement'
    },
    {
      img: 'https://ionicframework.com/docs/img/demos/card-media.png',
      title: 'Food'
    },
    {
      img: 'https://ionicframework.com/docs/img/demos/card-media.png',
      title: 'Photography'
    },
    {
      img: 'https://ionicframework.com/docs/img/demos/card-media.png',
      title: 'Videography'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
