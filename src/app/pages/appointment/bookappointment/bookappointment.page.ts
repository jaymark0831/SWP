import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CalendarComponent } from 'src/app/components/calendar/calendar.component';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

@Component({
  selector: 'app-bookappointment',
  templateUrl: './bookappointment.page.html',
  styleUrls: ['./bookappointment.page.scss'],
})
export class BookappointmentPage implements OnInit {

  appointmentForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    mobileNumber: new FormControl('', [Validators.required]),
    event: new FormControl('', [Validators.required])
  })

  dateSelected!: string;
  timeSelected!: string;
  // eventSelected!: string;
  userFirestoreData!: any;

  constructor(
    private modalController: ModalController, 
    private route: ActivatedRoute,
    private authService: AuthService,
    private appointmentService: AppointmentService
    ) { }

  async openCalendar() {
    const modal = await this.modalController.create({
      component: CalendarComponent,
      cssClass: 'calendardesign'
    });
    return await modal.present();
  }

  eventValue() {
    const selectedEvent = this.appointmentForm.get('event')?.value;
    return selectedEvent;
  }

  event = this.eventValue();

  ngOnInit() {
    // Retrieve the query parameters from the route
    // this.route.queryParams.subscribe(params => {
    //   this.dateSelected = params['date'];
    //   this.timeSelected = params['time'];
    // });

    // Get the user data passed from the login component
    // const userData = this.authService.getUserData();
    // if(userData) {
    //   this.appointmentForm.patchValue({
    //     firstName: userData.displayName,
    //     email: userData.email,
    //     mobileNum: userData.phoneNumber
    //   });
    //   console.log(userData.phoneNumber);
    //   console.log(userData.displayName);
    // }

    // Check authentication and redirect if not authenticated
    this.authService.checkAuthentication();

    // Retrieve user data from Firestore
    // this.authService.setUserData(this.authService.getUserData());
    // this.authService.getUserFirestoreData().subscribe((data) => {
    //   this.userFirestoreData = data;
    // });
    
    // console.log(this.userFirestoreData);

    // const selectedDate = this.appointmentService.selectedDate;
    // const selectedTime = this.appointmentService.selectedTime;

    // this.dateSelected = selectedDate;
    // this.timeSelected = selectedTime;

    this.route.queryParams.subscribe(params => {
      this.dateSelected = params['date'];
      this.timeSelected = params['time'];

    console.log('Selected Date: ', this.dateSelected);
    console.log('Selected Time: ', this.timeSelected);
    });


    /// Retrieve and populate form data from Firestore
    // this.authService.getAppointmentData().subscribe((docSnapshot: firebase.firestore.DocumentSnapshot<any>) => {
    //   if (docSnapshot.exists) {
    //     const appointmentData = docSnapshot.data();
    //     this.appointmentForm.setValue(appointmentData);
    //   }
    // });
    this.getUserFirestoreData();
  }

  getUserFirestoreData() {
    this.authService.getUserFirestoreData().subscribe((data: any) => {
      this.userFirestoreData = data;
      console.log(this.userFirestoreData);
    });
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      const appointmentData = {
        ...this.appointmentForm.value,
        date: this.dateSelected,
        time: this.timeSelected
        // event: this.eventSelected // Access the value of 'myEvent'
      };

      console.log('appointmentData:', appointmentData);
    // console.log('dateSelected:', this.dateSelected);
    // console.log('timeSelected:', this.timeSelected);
    // console.log('eventSelected:', this.eventSelected);

      // Store the form data in Firestore
      this.authService.storeAppointmentData(appointmentData)
        .then(() => {
          console.log('Appointment data stored successfully');
        })
        .catch((error: any) => {
          console.error('Error storing appointment data:', error);
        });

      // Perform further actions (e.g., submit form data to backend)
      // ...
    } else {
      console.log('Invalid form');
    }
  }

  

}
