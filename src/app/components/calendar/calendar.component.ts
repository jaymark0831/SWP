import { Component, OnInit, ViewChild} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonDatetime } from '@ionic/angular';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Params, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { QuerySnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})

export class CalendarComponent  implements OnInit {
  appointmentsCollection: any;

  constructor(
    private modalController: ModalController,
    private appointmentService: AppointmentService,
    private router: Router,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {}

  @ViewChild('datetime') datetime!: IonDatetime;

  availableTimes: string[] = [];
  selectedDate!: string;
  selectedTime!: string;
  activeTime!: string;

  // enable current month only

  currentMonth = (dateString: string) => {
    const date = new Date(dateString);
    // const currentDate = new Date().getUTCDate();
    const currentYear = new Date().getUTCFullYear();
    const currentMonth = new Date().getUTCMonth();
  
    const targetYear = date.getUTCFullYear();
    const targetMonth = date.getUTCMonth();
    // const targetDate = date.getUTCDate();
  
    /**
     * Enable the date if it is in the current month
     */
    return (
      currentYear === targetYear && currentMonth === targetMonth ||
      currentYear === targetYear && currentMonth + 1 === targetMonth
    );
  };

  async onDateChange(event: any) {
    const selectedDate: Date = new Date(event.detail.value);

    // Generate the available times based on the selected date
    this.availableTimes = await this.generateAvailableTimes(selectedDate);

    // Update the selected date and time
    this.selectedDate = selectedDate.toLocaleDateString();
    this.selectedTime = ""; // Clear the previous selected time
    this.activeTime = "";
    console.log('Selected Date:', this.selectedDate);
  }

  onTimeButtonClick(time: string) {
    // Update the selected time
    this.selectedTime = time;
    this.activeTime = time; // Set the active time
    console.log('Selected Time:', this.selectedTime);
  }

  //Selected TIME
  async generateAvailableTimes(selectedDate: Date): Promise<string[]> {
    const availableTimes: string[] = [];
    const startHour = 8;
    const endHour = 14;
  
    const timePromises = [];
  
    for (let hour = startHour; hour <= endHour; hour++) {
      const formattedHour = hour % 12 || 12; // Convert to 12-hour format
      const timeLabel = hour < 12 ? 'AM' : 'PM';
      const nextFormattedHour = (formattedHour + 1) % 12 || 12;
      const nextTimeLabel = hour < 11 || (hour === 11 && formattedHour === 12) ? 'AM' : 'PM';
  
      const timeSlot = `${formattedHour}:00 ${timeLabel} - ${nextFormattedHour}:00 ${nextTimeLabel}`;
      const timePromise = this.isTimeReserved(selectedDate, timeSlot)
        .then((isReserved) => {
          if (!isReserved) {
            availableTimes.push(timeSlot);
          }
        });
      timePromises.push(timePromise);
    }
  
    await Promise.all(timePromises);
  
    return availableTimes;
  }

  //testing disabling reserved data and time
  checkReservation() {
    const selectedDate = new Date(); // Replace with the selected date
    const selectedTimeSlot = '9:00 AM - 10:00 AM'; // Replace with the selected time slot
  
    this.isTimeReserved(selectedDate, selectedTimeSlot);
  }
  
  //Checking of reserved date and time in firestore
  async isTimeReserved(selectedDate: Date, timeSlot: string): Promise<boolean> {
    const appointmentRef = this.firestore.collection('appointments').ref;
    const query = appointmentRef
      .where('appointmentData.date', '==', selectedDate.toISOString())
      .limit(1);
  
    const snapshot = await query.get();
  
    if (!snapshot.empty) {
      const appointments = snapshot.docs.map((doc) => doc.data());
      const isReserved = appointments.some((appointment: any) => {
        const appointmentData = appointment.appointmentData;
        const appointmentDate = appointmentData.date;
        const appointmentTime = appointmentData.time;
  
        console.log(`Date: ${appointmentDate}, Time: ${appointmentTime}`);
  
        // Perform the comparison logic here
        return this.compareTimeSlots(appointmentTime, timeSlot);
      });
  
      if (!isReserved) {
        console.log(`Reserved: ${timeSlot}`);
      } else {
        console.log(`Available: ${timeSlot}`);
      }
  
      return isReserved;
    }
  
    console.log(`Available: ${timeSlot}`);
    return false;
  }
  
  compareTimeSlots(timeSlot1: string, timeSlot2: string): boolean {
    // Compare the time slots here based on your specific format and requirements
    // Adjust the comparison logic as per your time slot format and matching criteria
    return timeSlot1 === timeSlot2;
  }
  
  clearSelection() {
    this.selectedDate = "";
    this.selectedTime = "";
    this.datetime.value = [];
    this.activeTime = ""; // Clear the active time
    this.availableTimes = [];
    console.log('Selection Cleared');
  }

  confirmSelection() {

    // Pass the selected date and time as query parameters in the URL
    // const queryParams = `?date=${encodeURIComponent(
    //   this.selectedDate
    // )}&time=${encodeURIComponent(this.selectedTime)}`;

    // Redirect to the "bookappointment" page with the query parameters
    // window.location.href = `menulogin/bookappointment${queryParams}`;
    
    // this.appointmentService.selectedDate = this.selectedDate;
    // this.appointmentService.selectedTime = this.selectedTime;

     // Pass the selected date and time as query parameters in the URL
    const queryParams: Params = {
      date: this.selectedDate,
      time: this.selectedTime
    };

    // Redirect to the "bookappointment" page with the query parameters
    this.router.navigate(['/menulogin/bookappointment'], { queryParams });
    this.modalController.dismiss();
  }
  
  closeModal() {
    this.modalController.dismiss();
  }

}