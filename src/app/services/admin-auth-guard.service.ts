import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class AdminAuthGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService) { }

  public canActivate() {
    const user = this.userService.getCurrentUser();
    if (user && user.claims.isAdmin === true) {
      return true;
    }
    this.router.navigate(["no-access"]);
    return false;
  }
}
