import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./../services/auth.service";

@Component({
  selector: "home",
  styleUrls: ["./home.component.css"],
  templateUrl: "./home.component.html",
})
export class HomeComponent {

  constructor(
    public authService: AuthService,
    private router: Router,
    ) {}

  }
