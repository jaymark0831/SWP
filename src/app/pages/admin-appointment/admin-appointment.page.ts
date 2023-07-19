import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-appointment',
  templateUrl: './admin-appointment.page.html',
  styleUrls: ['./admin-appointment.page.scss'],
})
export class AdminAppointmentPage implements OnInit {
  appointments!: any[];
  totalAppointments: number = 0;
  filteredItems!: any[];
  segmentValue: string = 'pending';
  
  constructor(private afs: AngularFirestore, private authService: AuthService) { }

  ngOnInit() {
    this.authService.getAppointmentCollectionData().subscribe(
      (data) => {
        this.appointments = data;
        this.totalAppointments = this.appointments.length;
        this.filterAppointments();
        console.log('Appointments: ', this.appointments);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getSubtitleText(): string {
    if (this.segmentValue === 'completed') {
      return 'Total Completed';
    } else if (this.segmentValue === 'cancelled') {
      return 'Total Cancelled';
    } else if (this.segmentValue === 'confirmed') {
      return 'Total Confirmed';
    } else {
      return 'Total Pending';
    }
  }

  filterAppointments() {
    if (this.segmentValue === 'completed') {
      this.filteredItems = this.appointments.filter(appointment => appointment.appointmentData.status === 'completed');
      this.totalAppointments = this.filteredItems.length;
    } else if (this.segmentValue === 'cancelled') {
      this.filteredItems = this.appointments.filter(appointment => appointment.appointmentData.status === 'cancelled');
      this.totalAppointments = this.filteredItems.length;
    } else if (this.segmentValue === 'confirmed') {
      this.filteredItems = this.appointments.filter(appointment => appointment.appointmentData.status === 'confirmed');
      this.totalAppointments = this.filteredItems.length;
    } else {
      this.filteredItems = this.appointments.filter(appointment => appointment.appointmentData.status === 'pending');
      this.totalAppointments = this.filteredItems.length;
    }
  }

  confirmAppointment(appointment: any, button: string) {
    if (button === 'confirm' && appointment.appointmentData.status !== 'completed' && appointment.appointmentData.status !== 'cancelled') {
      appointment.appointmentData.status = 'confirmed';
      
      // Save the updated appointment in the database
      this.afs
        .collection('appointments')
        .doc(appointment.id) // Assuming 'id' is the unique identifier of the appointment
        .update({ 'appointmentData.status': 'confirmed' })
        .then(() => {
          console.log('Appointment confirmed and saved successfully');
        })
        .catch((error) => {
          console.error('Error updating appointment:', error);
        });

      // Perform any additional actions or logic related to confirming the appointment
    }
    else if (button === 'completed' && appointment.appointmentData.status !== 'cancelled') {
      appointment.appointmentData.status = 'completed';
      
      // Save the updated appointment in the database
      this.afs
        .collection('appointments')
        .doc(appointment.id) // Assuming 'id' is the unique identifier of the appointment
        .update({ 'appointmentData.status': 'completed' })
        .then(() => {
          console.log('Appointment marked as completed and saved successfully');
        })
        .catch((error) => {
          console.error('Error updating appointment:', error);
        });

      // Perform any additional actions or logic related to marking the appointment as done
    } else if (button === 'delete' && (appointment.appointmentData.status === 'completed' || appointment.appointmentData.status === 'cancelled')) {
        // Delete the appointment from the database
        this.deleteAppointment(appointment.id)
          .then(() => {
            console.log('Appointment deleted successfully');
          })
          .catch((error) => {
            console.error('Error deleting appointment:', error);
          });

        // Perform any additional actions or logic related to deleting the appointment
      }
    }

    updateAppointmentStatus(appointmentId: string, status: string, successMessage: string) {
      // Save the updated appointment status in the database
      this.afs
        .collection('appointments')
        .doc(appointmentId)
        .update({ 'appointmentData.status': status })
        .then(() => {
          console.log(successMessage);
        })
        .catch((error) => {
          console.error('Error updating appointment:', error);
        });
    }

    deleteAppointment(appointmentId: string) {
      // Delete the appointment from the database
      return this.afs
        .collection('appointments')
        .doc(appointmentId)
        .delete();
    }
  
}
