import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit {
  appointments!: any[];

  constructor(private authService: AuthService) { }

  ngOnInit() {

    // Check authentication and redirect if not authenticated
    this.authService.checkAuthentication();

    // Retrieve appointment data from Firestore
    this.authService.getAppointmentData().subscribe((appointments) => {
      this.appointments = appointments;
    });
  }

}
