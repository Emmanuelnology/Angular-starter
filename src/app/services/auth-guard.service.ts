import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    ) { }

  public canActivate() { // if logged in return true, otherwise return to login page and return false
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }

  }
}
