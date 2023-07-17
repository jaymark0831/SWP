import { GoogleAuthProvider } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userData: any;
  eventSelected: any;
  timeSelected: any;
  dateSelected: any;
  public userFirestoreData: any;

  constructor( 
    private afs: AngularFireAuth, 
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

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

  // deleteAccount() {
  //   return this.afs.currentUser
  //     .then((user) => {
  //       if (user) {
  //         // Delete user in Firebase Authentication
  //         return user.delete()
  //           .then(() => {
  //             // Delete user document in Firestore
  //             return this.firestore.collection('users').doc(user.uid).delete();
  //           }); 
  //       } else {
  //         return Promise.reject("User not found");
  //       }
  //     });
  // }

  signInWithEmailAndPassword(user: { email: string, password: string }) {
    return this.afs.signInWithEmailAndPassword(user.email, user.password)
  }
  
  isAuthenticated(): boolean {
    // Check the authentication state
    return !!this.afAuth.currentUser;
  }
  
  checkAuthentication(): void {
    if (!this.isAuthenticated()) {
      // User is not authenticated, redirect to login page
      this.router.navigate(['/']);
    }
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

  // Retrieve user data from Firestore
  // getUserFirestoreData() {
  //   const uid = this.userData.uid;
  //   return this.firestore.collection('users').doc(uid).valueChanges();
  // }
    // return this.firestore.collection('users').doc(uid).valueChanges();
  //   return this.firestore.collection('users', (ref) =>
  //   ref.where('userId', '==', uid)
  // ).valueChanges({ idField: 'id' });



  getUserFirestoreData(): Observable<any> {
    return new Observable((observer) => {
      this.afAuth.currentUser.then((user) => {
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
  
  
  
  
  
}