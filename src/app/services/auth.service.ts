import { GoogleAuthProvider } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { Observable, map, of, switchMap, tap } from 'rxjs';
import { getAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static isAuthenticated() {
    throw new Error('Method not implemented.');
  }
  userData: any;
  eventSelected: any;
  timeSelected: any;
  dateSelected: any;
  public userFirestoreData: any;

  constructor( 
    private afs: AngularFireAuth, 
    private firestore: AngularFirestore,
    private router: Router,
  ) {
   }

  setUserData(data: any) {
    this.userData = data;
  }

  getUserData() {
    return this.userData;
  }


  signInWithGoogle() {
    return this.afs.signInWithPopup(new GoogleAuthProvider());
  }

  signupWithEmailAndPassword(user: { email: string, password: string,displayName: string, firstName: string,lastName: string, phoneNumber: string}) {
    return this.afs.createUserWithEmailAndPassword(user.email, user.password)
      .then((userCredential: firebase.auth.UserCredential) => {
      if (userCredential.user) {
        const uid = userCredential.user.uid;

        // Update the user's display name
        userCredential.user.updateProfile({ displayName: user.displayName });

        // Store additional user data in Firestore
        return this.firestore.collection('users').doc(uid).set({
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber
        }).then(() => {
          return Promise.resolve(userCredential);
        });
      } else {
        return Promise.reject("Error creating user");
      }
    });
  }

  signInWithEmailAndPassword(user: { email: string, password: string }) {
    return this.afs.signInWithEmailAndPassword(user.email, user.password)
  }

  
  //authentication
  isAuthenticated() {
    return this.afs.authState.pipe(
      tap(user => console.log('Current user:', user)),
      switchMap(user => {
        if (user) {
          this.userData = user;
          return of(true);
        } else {
          this.userData = null;
          return of(false);
        }
      }),
      tap(isAuthenticated => console.log('Is user authenticated:', isAuthenticated))
    );
  }

  storeAppointmentData(appointmentData: any) {
    return this.firestore.collection('appointments').add({
      userId: this.userData.uid,
      appointmentData
    });
  }
  
  // Retrieve appointment data from Firestore
  getAppointmentData() {
    const uid = this.userData.uid;
    return this.firestore.collection('appointments', (ref) =>
      ref.where('userId', '==', uid)
    ).valueChanges({ idField: 'id' });
  }

  getUserFirestoreData(): Observable<any> {
    return new Observable((observer) => {
      this.afs.currentUser.then((user) => {
        if (user) {
          const uid = user.uid;
          this.firestore.collection('users').doc(uid).valueChanges().subscribe(
            (data) => {
              observer.next(data);
              observer.complete();
            },
            (error) => {
              observer.error(error);
            }
          );
        } else {
          observer.next(null);
          observer.complete();
        }
      });
    });
  }

  getAppointmentCollectionData() {
    return this.firestore.collection('appointments').valueChanges({ idField: 'id' });
  }
  
  
  signOut() {
    this.afs.signOut().then(() => {
      // Successful sign-out
      this.router.navigate(['/']); // Redirect to the login page or any desired page
    }).catch((error: any) => {
      console.error(error);
    });
  }

  adminSignOut() {
    this.afs.signOut().then(() => {
      // Successful sign-out
      this.router.navigate(['admin-login']); // Redirect to the login page or any desired page
    }).catch((error: any) => {
      console.error(error);
    });
  }
  
  
  
}