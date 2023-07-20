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
        // this.sortAppointments();
        this.sortAppointments();
        this.filterAppointments();
        console.log('Appointments: ', this.appointments);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  sortAppointments() {
    this.appointments.sort((a, b) => {
      const dateA = new Date(a.appointmentData.date);
      const dateB = new Date(b.appointmentData.date);
      return dateA.getTime() - dateB.getTime(); // Sorts in descending order (latest date on top)
    });

    console.log('Sorted Appointments: ', this.appointments); // Display sorted appointments in the console
  }

  // sortAppointments() {
  //   this.appointments.sort((a, b) => {
  //     const dateA = new Date(a.appointmentData.date + ' ' + a.appointmentData.time);
  //     const dateB = new Date(b.appointmentData.date + ' ' + b.appointmentData.time);
  //     return dateB.getTime() - dateA.getTime(); // Sorts in descending order (latest date on top)
  //   });
  // }

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
    if (!appointment || !appointment.appointmentData) {
      // Handle the case where the appointment object or appointmentData is undefined
      console.error('Invalid appointment object');
      return;
    }
  
    const appointmentStatus = appointment.appointmentData.status;
  
    if (button === 'confirm' && appointmentStatus !== 'completed' && appointmentStatus !== 'cancelled') {
      appointment.appointmentData.status = 'confirmed';
      
      // Save the updated appointment in the database
      this.updateAppointmentStatus(appointment.id, 'confirmed', 'Appointment confirmed and saved successfully');
  
      // Perform any additional actions or logic related to confirming the appointment
    } else if (button === 'completed' && appointmentStatus !== 'cancelled') {
      appointment.appointmentData.status = 'completed';
      
      // Save the updated appointment in the database
      this.updateAppointmentStatus(appointment.id, 'completed', 'Appointment marked as completed and saved successfully');
  
      // Perform any additional actions or logic related to marking the appointment as done
    } else if (button === 'delete' && (appointmentStatus === 'completed' || appointmentStatus === 'cancelled')) {
      // Delete the appointment from the display (not Firestore)
      this.deleteAppointment(appointment);
  
      // Perform any additional actions or logic related to deleting the appointment from the display
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

    deleteAppointment(appointment: any) {
      if (appointment.appointmentData.status === 'completed') {
        // Remove the appointment from the appointments array
        const index = this.appointments.indexOf(appointment);
        if (index !== -1) {
          this.appointments.splice(index, 1);
        }
    
        // Update the filteredItems and totalAppointments variables based on the segment value
        this.filterAppointments();
    
        // Perform any additional actions or logic related to deleting the appointment from the display
    
        console.log('Appointment deleted from display');
        return Promise.resolve(); // Return a resolved promise since no Firestore deletion is required
      } else if (appointment.id) {
        // Delete the appointment from the database
        return this.afs
          .collection('appointments')
          .doc(appointment.id)
          .delete()
          .then(() => {
            console.log('Appointment deleted successfully from Firestore');
          })
          .catch((error) => {
            console.error('Error deleting appointment:', error);
          });
      } else {
        return Promise.reject('Invalid appointment');
      }
    }
    
    
  
}
