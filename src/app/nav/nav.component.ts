import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-nav",
  styleUrls: ["./nav.component.css"],
  templateUrl: "./nav.component.html",
})
export class NavComponent {

  constructor(public authService: AuthService, private router: Router) { }

  public logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

}
