import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class FbAuthService {

  constructor(
    public firebaseAuth: AngularFireAuth
  ) { }

   doRegister(value) {
    return this.firebaseAuth
    .auth.createUserAndRetrieveDataWithEmailAndPassword(
      value.email,
      value.password
    );
   }

   doLogin(value) {
    return this.firebaseAuth
      .auth.signInWithEmailAndPassword(
        value.email,
        value.password
      );
   }

   doLogout() {
    return this.firebaseAuth
      .auth.signOut();
   }

   isLoggedIn(): boolean {
     if (this.getCurrentUser()) {
      return true;
     }
    return false;
   }

   getCurrentUser() {
    return this.firebaseAuth
      .auth.currentUser;
   }
}
