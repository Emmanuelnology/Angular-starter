import { Component, OnInit } from "@angular/core";
import { FbAuthService } from "../services/fb-auth.service";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-account",
  styleUrls: ["./account.component.css"],
  templateUrl: "./account.component.html",
})
export class AccountComponent implements OnInit {
  public taskCount;

  constructor(
    public authService: FbAuthService,
    public userService: UserService,
    ) {}

   public ngOnInit() {
     // ...
    }

}
