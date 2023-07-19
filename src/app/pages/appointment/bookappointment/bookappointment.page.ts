import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IonInput, ModalController } from '@ionic/angular';
import { CalendarComponent } from 'src/app/components/calendar/calendar.component';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

@Component({
  selector: 'app-bookappointment',
  templateUrl: './bookappointment.page.html',
  styleUrls: ['./bookappointment.page.scss'],
})
export class BookappointmentPage implements OnInit {

  dateSelected!: string;
  timeSelected!: string;
  // eventSelected!: string;
  userFirestoreData!: any;
  inputModel: any;
  filteredSuggestions: string[] = []; // Holds the filtered suggestions
  firstNameValue: any;
  lastNameValue: any;
  emailValue: any;
  mobileNumberValue: any;
  nameValue!: string;
  myeventValue: any;

  constructor(
    private modalController: ModalController, 
    private route: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
      this.authService.getUserFirestoreData().subscribe((data: any) => {
        this.userFirestoreData = data;
        console.log('Firestore: ', this.userFirestoreData);
    
        if (this.userFirestoreData) {
          this.appointmentForm.patchValue({
            firstName: this.userFirestoreData.firstName,
            lastName: this.userFirestoreData.lastName,
            email: this.userFirestoreData.email,
            mobileNumber: this.userFirestoreData.phoneNumber,
          });
          
          // Get the default values from the form controls
          this.nameValue = this.appointmentForm.value.firstName + " " + this.appointmentForm.value.lastName;
          this.emailValue = this.appointmentForm.value.email;
          this.mobileNumberValue = this.appointmentForm.value.mobileNumber;

          // Subscribe to value changes of form controls
          this.appointmentForm.get('firstName')?.valueChanges.subscribe((firstName: string) => {
            this.nameValue = firstName + ' ' + this.appointmentForm.value.lastName;
          });
        
          this.appointmentForm.get('lastName')?.valueChanges.subscribe((lastName: string) => {
            this.nameValue = this.appointmentForm.value.firstName + ' ' + lastName;
          });

          this.appointmentForm.get('email')?.valueChanges.subscribe((value: string) => {
            this.emailValue = value;
          });

          this.appointmentForm.get('mobileNumber')?.valueChanges.subscribe((value: string) => {
            this.mobileNumberValue = value;
          });

          this.appointmentForm.get('event')?.valueChanges.subscribe((value: string) => {
            this.myeventValue = value;
          });
        }
      });
    
      // Check authentication and redirect if not authenticated
      this.authService.checkAuthentication();
    
      this.route.queryParams.subscribe(params => {
        this.dateSelected = params['date'];
        this.timeSelected = params['time'];
    
        console.log('Selected Date: ', this.dateSelected);
        console.log('Selected Time: ', this.timeSelected);
      });
    }
    

  appointmentForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    mobileNumber: new FormControl('', [Validators.required]),
    event: new FormControl('', [Validators.required])
  })

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

  onSubmit() {
    if (this.appointmentForm.valid) {
      console.log('Form is valid');
      console.log('Form value:', this.appointmentForm.value);
  
      // Add the date and time values to the form value
      const appointmentData = {
        ...this.appointmentForm.value,
        date: this.dateSelected,
        time: this.timeSelected,
        status: 'pending'
      };
  
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
      console.log('Form is invalid');
  
      Object.keys(this.appointmentForm.controls).forEach((controlName) => {
        const control = this.appointmentForm.get(controlName);
        console.log(`Validation errors for ${controlName}:`, control?.errors);
      });
    }
  }
  
  
  

  // only numbers for mobilenumber
  @ViewChild('ionInputEl', { static: true }) ionInputEl!: IonInput;

  onInput(ev: any) {
    const value = ev.target!.value;

    // Removes non numeric characters
    const filteredValue = value.replace(/[^0-9]/g, '');

    /**
     * Update both the state variable and
     * the component to keep them in sync.
     */
    this.ionInputEl.value = this.inputModel = filteredValue;
  }

  

}
