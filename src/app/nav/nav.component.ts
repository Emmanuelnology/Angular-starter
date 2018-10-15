import { Component, OnInit } from "@angular/core";
import { FbAuthService } from "../services/fb-auth.service";
import { IUser, UserService  } from "../services/user.service";

import { Router } from "@angular/router";

@Component({
  selector: "app-nav",
  styleUrls: ["./nav.component.css"],
  templateUrl: "./nav.component.html",
})
export class NavComponent implements OnInit {
  public currentUser;
  constructor(
    public authService: FbAuthService,
    private router: Router,
    public userService: UserService,
    ) { }

  public logout() {
      this.authService.doLogout().then(
        () => this.router.navigate(["/login"]),
        );
      }

  public ngOnInit() {
    // ...

  }

}
