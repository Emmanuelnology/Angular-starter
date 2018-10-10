import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./../services/auth.service";

@Component({
  selector: "login",
  styleUrls: ["./login.component.css"],
  templateUrl: "./login.component.html",
})
export class LoginComponent {
  public invalidLogin: boolean;

  constructor(
    private router: Router,
    private authService: AuthService) { }

  public signIn(credentials) {
    this.authService.login(credentials)
      .subscribe((result) => {
        if (result) {
          this.router.navigate(["/"]);
        } else {
          this.invalidLogin = true;
        }
      });
  }
}
