import { GoogleAuthProvider } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from '@firebase/util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private afs: AngularFireAuth, private firestore: AngularFirestore) { }

  signInWithGoogle() {
    return this.afs.signInWithPopup(new GoogleAuthProvider());
  }

  signupWithEmailAndPassword(user: {email: string, password: string}) {
    return this.afs.createUserWithEmailAndPassword(user.email, user.password);
  }

  signInWithEmailAndPassword(user: {email: string, password: string}) {
    return this.afs.signInWithEmailAndPassword(user.email, user.password);
  }
}
