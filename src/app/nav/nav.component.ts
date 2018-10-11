import { Component } from "@angular/core";
import { FbAuthService } from "../services/fb-auth.service";

import { Router } from "@angular/router";

@Component({
  selector: "app-nav",
  styleUrls: ["./nav.component.css"],
  templateUrl: "./nav.component.html",
})
export class NavComponent {

  constructor(public authService: FbAuthService, private router: Router) { }

  public logout() {
    this.authService.doLogout().then(
      () => this.router.navigate(["/login"]),
      );
  }

}
