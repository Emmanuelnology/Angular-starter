import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FbAuthService } from "./../services/fb-auth.service";

@Component({
  selector: "app-home",
  styleUrls: ["./home.component.css"],
  templateUrl: "./home.component.html",
})
export class HomeComponent {

  constructor(
    public authService: FbAuthService,
    private router: Router,
    ) { }

}
