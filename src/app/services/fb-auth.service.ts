import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root",
})

export class FbAuthService {

  constructor(
    public firebaseAuth: AngularFireAuth,
  ) { }

   public doRegister(value) {
    return this.firebaseAuth
    .auth.createUserAndRetrieveDataWithEmailAndPassword(
      value.email,
      value.password,
    );
   }

   public doLogin(value) {
    return this.firebaseAuth
      .auth.signInWithEmailAndPassword(
        value.email,
        value.password,
      );
   }

   public doLogout() {
    return this.firebaseAuth
      .auth.signOut();
   }

   public isLoggedIn(): boolean {
     if (this.getCurrentUser()) {
      return true;
     }
     return false;
   }

   public getCurrentUser() {
    return this.firebaseAuth
      .auth.currentUser;
   }

}
