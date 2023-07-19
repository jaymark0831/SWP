import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit {
  appointments!: any[];

  constructor(private authService: AuthService, private firestore: AngularFirestore) { }

  ngOnInit() {

    // Check authentication and redirect if not authenticated
    this.authService.checkAuthentication();

    // Retrieve appointment data from Firestore
    this.authService.getAppointmentData().subscribe((appointments) => {
      this.appointments = appointments;
    });
  }

  cancelAppointment(appointment: any) {
    if (appointment.appointmentData.status === 'cancelled') {
      console.log('Appointment is already cancelled.');
      return;
    }

    // Update the appointment status to 'cancelled'
    const appointmentRef = this.firestore.collection('appointments').doc(appointment.id);
    appointmentRef
      .update({ 'appointmentData.status': 'cancelled' })
      .then(() => {
        console.log('Appointment cancelled successfully.');
      })
      .catch((error) => {
        console.log('Error cancelling appointment:', error);
      });
  }

}
