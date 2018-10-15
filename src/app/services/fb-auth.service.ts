import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root",
})

export class FbAuthService {

  public currentUser;
  constructor(
    public firebaseAuth: AngularFireAuth,
    ) {

      this.firebaseAuth
      .auth.onAuthStateChanged((user) => {
        this.currentUser = user;
      });

    }

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

        public isLoggedIn() {
          if (this.getCurrentUser()) {
            return true;
          } else {
            return false;
          }
        }

        public getCurrentUser() {
          return this.currentUser;
        }

      }
