
import { Component, OnInit } from "@angular/core";
import { IUser, UserService } from "./../services/user.service";

import { Observable } from "rxjs";

@Component({
  selector: "app-admin",
  styleUrls: ["./admin.component.css"],
  templateUrl: "./admin.component.html",
})
export class AdminComponent implements OnInit {
  public hideSpinner: boolean;
  public users: Observable<IUser[]>;

  constructor(private userService: UserService) {}

  public ngOnInit() {
    this.users = this.userService.users;
  }
}
