import { Component, OnInit, ViewChild} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonDatetime } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Params, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})

export class CalendarComponent  implements OnInit {

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private router: Router,
    private firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.getAppointments();
  }

  @ViewChild('datetime') datetime!: IonDatetime;

  availableTimes: string[] = [];
  selectedDate!: string;
  selectedTime!: string;
  activeTime!: string;
  appointments: any[] = [];

  getAppointments() {
    this.firestore.collection('appointments').valueChanges().subscribe((appointments: any[]) => {
      this.appointments = appointments;
      this.processAppointmentData();
    });
  }

  processAppointmentData() {
    const bookedTimes: { date: string; time: string }[] = [];
  
    for (const appointment of this.appointments) {
      if (appointment.appointmentData) {
        const appointmentData = appointment.appointmentData;
        const dateAndTimeEntries = Object.entries(appointmentData).filter(
          ([key, value]) =>
            typeof value === 'string' &&
            (key.toLowerCase().includes('date') ||
              key.toLowerCase().includes('time'))
        );
  
        const entry: { date: string; time: string } = { date: '', time: '' };
  
        for (const [key, value] of dateAndTimeEntries) {
          if (key.toLowerCase().includes('date')) {
            entry.date = value as string;
          } else if (key.toLowerCase().includes('time')) {
            entry.time = value as string;
          }
        }
  
        if (entry.date && entry.time) {
          bookedTimes.push(entry);
        }
      }
    }

    console.log('Appointments:', this.appointments);
    console.log('Booked Times:', bookedTimes);
  
    this.availableTimes = this.generateAvailableTimes(bookedTimes);
  }
  
  
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

  generateAvailableTimes(bookedTimes: { date: string; time: string }[]): string[] {
    if (!this.selectedDate) {
      return []; // No selected date, return empty array
    }

    const selectedDateBookedTimes = bookedTimes
      .filter((booking) => booking.date === this.selectedDate)
      .map((booking) => booking.time);

    const availableTimes: string[] = [];
    const startHour = 8;
    const endHour = 14;

    for (let hour = startHour; hour <= endHour; hour++) {
      const formattedHour = hour % 12 || 12; // Convert to 12-hour format
      const timeLabel = hour < 12 ? 'AM' : 'PM';
      const nextFormattedHour = (formattedHour + 1) % 12 || 12;
      const nextTimeLabel =
        hour < 11 || (hour === 11 && formattedHour === 12) ? 'AM' : 'PM';

      const time = `${formattedHour}:00 ${timeLabel} - ${nextFormattedHour}:00 ${nextTimeLabel}`;

      if (!selectedDateBookedTimes.includes(time)) {
        availableTimes.push(time);
      }
    }

    return availableTimes;
  }

  isTimeReservedOnSelectedDate(time: string): boolean {
    if (!this.selectedDate) {
      return false; // No selected date, no reservation to check
    }

    const selectedDateTime = new Date(this.selectedDate + ' ' + time);

    for (const appointment of this.appointments) {
      if (appointment.appointmentData) {
        const appointmentData = appointment.appointmentData;

        for (const key in appointmentData) {
          if (
            appointmentData.hasOwnProperty(key) &&
            typeof appointmentData[key] === 'string' &&
            key.toLowerCase().includes('date') &&
            appointmentData[key] === selectedDateTime.toLocaleDateString() &&
            appointmentData['time'] === time
          ) {
            return true; // Time is reserved on the selected date
          }
        }
      }
    }

    return false; // Time is not reserved on the selected date
  }

  onDateChange(event: any) {
    const selectedDate: Date = new Date(event.detail.value);
  
    // Update the selected date
    this.selectedDate = selectedDate.toLocaleDateString();
    console.log('Selected Date:', this.selectedDate);
  
    // Filter the booked times to get only the ones for the selected date
    const bookedTimesForSelectedDate = this.appointments
      .filter((appointment) => {
        const appointmentData = appointment.appointmentData;
        return (
          appointmentData &&
          appointmentData.hasOwnProperty('date') &&
          appointmentData.date === this.selectedDate
        );
      })
      .map((appointment) => {
        const appointmentData = appointment.appointmentData;
        return {
          date: appointmentData.date,
          time: appointmentData.time,
        };
      });
  
    // Generate the available times based on the selected date
    this.availableTimes = this.generateAvailableTimes(bookedTimesForSelectedDate);
  
    // Clear the previous selected time
    this.selectedTime = '';
    this.activeTime = '';
  }

  onTimeButtonClick(time: string) {
    // Update the selected time
    this.selectedTime = time;
    this.activeTime = time; // Set the active time
    console.log('Selected Time:', this.selectedTime);
  }

  isTimeBookedOnSelectedDate(time: string): boolean {
    if (!this.selectedDate) {
      return false; // No selected date, no reservation to check
    }
  
    for (const appointment of this.appointments) {
      if (appointment.appointmentData) {
        const appointmentData = appointment.appointmentData;
  
        for (const key in appointmentData) {
          if (
            appointmentData.hasOwnProperty(key) &&
            typeof appointmentData[key] === 'string' &&
            key.toLowerCase().includes('date') &&
            appointmentData[key] === this.selectedDate &&
            appointmentData['time'] === time
          ) {
            return true; // Time is booked on the selected date
          }
        }
      }
    }
  
    return false; // Time is not booked on the selected date
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