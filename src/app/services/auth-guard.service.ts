import { AngularFireAuth } from "@angular/fire/auth";
import { CanActivate, Router } from "@angular/router";
import { first, map } from "rxjs/operators";

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private firebaseAuth: AngularFireAuth, private router: Router) {}

    public canActivate(): Observable<boolean> {
      return this.firebaseAuth.authState.pipe(
        map(
        (user) => {
          if (user) {
            console.log(user.uid);
            return true;
          } else {
            this.router.navigate(["/login"]);
          }
        },
        ),
        first(),
      );
    }
}
