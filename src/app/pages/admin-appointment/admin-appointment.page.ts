import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
// import { AlertController } from '@ionic/angular';
// import {  collection, collectionData, Firestore} from '@angular/fire/firestore';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-appointment',
  templateUrl: './admin-appointment.page.html',
  styleUrls: ['./admin-appointment.page.scss'],
})
export class AdminAppointmentPage implements OnInit {
  itemsCollection: AngularFirestoreCollection<any>;
  items!: any[];
  appointmentCount: number = 0;

  // appointments$ = collectionData(collection(this.firestore, 'appointments')) as Observable<Appointment[]>;

  constructor(
    private afs: AngularFirestore
    // private firestore: Firestore
  ) { 
    this.itemsCollection = this.afs.collection('appointments');
    // this.items = this.itemsCollection.valueChanges();
  }

  ngOnInit() {
    this.itemsCollection.valueChanges().subscribe(data => {
      this.items = data;
      this.appointmentCount = data.length;
      console.log('Total: ', this.appointmentCount);
    });
  }

  click() {
    
  }

} 