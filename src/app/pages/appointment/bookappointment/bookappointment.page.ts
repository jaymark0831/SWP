import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CalendarComponent } from 'src/app/components/calendar/calendar.component';
import { IonDatetime } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bookappointment',
  templateUrl: './bookappointment.page.html',
  styleUrls: ['./bookappointment.page.scss'],
})
export class BookappointmentPage implements OnInit {

  appointmentForm: FormGroup = new FormGroup({
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    mobileNum: new FormControl('', [Validators.required])
  })

  dateSelected!: string;
  timeSelected!: string;

  constructor(private modalController: ModalController, private route: ActivatedRoute) { }

  async openCalendar() {
    const modal = await this.modalController.create({
      component: CalendarComponent,
      cssClass: 'calendardesign'
    });
    return await modal.present();
  }

  ngOnInit() {
    // Retrieve the query parameters from the route
    this.route.queryParams.subscribe(params => {
      this.dateSelected = params['date'];
      this.timeSelected = params['time'];
    });
  }


}
