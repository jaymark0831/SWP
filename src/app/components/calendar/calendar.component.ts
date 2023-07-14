import { Component, OnInit, ViewChild} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonDatetime } from '@ionic/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})

export class CalendarComponent  implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  @ViewChild('datetime') datetime!: IonDatetime;

  availableTimes: string[] = [];
  selectedDate!: string;
  selectedTime!: string;
  activeTime!: string;

  // enable current month only

  currentMonth = (dateString: string) => {
    const date = new Date(dateString);
    const currentDate = new Date().getUTCDate();
    const currentYear = new Date().getUTCFullYear();
    const currentMonth = new Date().getUTCMonth();
  
    const targetYear = date.getUTCFullYear();
    const targetMonth = date.getUTCMonth();
    const targetDate = date.getUTCDate();
  
    /**
     * Enable the date if it is in the current month
     */
    return currentYear === targetYear && currentMonth === targetMonth && currentDate !== targetDate;
  };

  onDateChange(event: any) {
    const selectedDate: Date = new Date(event.detail.value);

    // Generate the available times based on the selected date
    this.availableTimes = this.generateAvailableTimes(selectedDate);

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

  generateAvailableTimes(selectedDate: Date): string[] {
    const availableTimes: string[] = [];
    const startHour = 8;
    const endHour = 14;
  
    for (let hour = startHour; hour <= endHour; hour++) {
      const formattedHour = hour % 12 || 12; // Convert to 12-hour format
      const timeLabel = hour < 12 ? 'AM' : 'PM';
      const nextFormattedHour = (formattedHour + 1) % 12 || 12;
      const nextTimeLabel = hour < 11 || (hour === 11 && formattedHour === 12) ? 'AM' : 'PM';
  
      availableTimes.push(`${formattedHour}:00 ${timeLabel} - ${nextFormattedHour}:00 ${nextTimeLabel}`);
    }
  
    return availableTimes;
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
    const queryParams = `?date=${encodeURIComponent(
      this.selectedDate
    )}&time=${encodeURIComponent(this.selectedTime)}`;

    // Redirect to the "bookappointment" page with the query parameters
    window.location.href = `menulogin/bookappointment${queryParams}`;
  }
  
  closeModal() {
    this.modalController.dismiss();
  }

}
