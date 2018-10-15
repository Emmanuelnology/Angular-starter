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
  public currentUser;

  constructor(
    public authService: FbAuthService,
    private userService: UserService,
    ) {}

   public ngOnInit() {
    this.userService.currentUser.subscribe(
      (user) => {
        this.currentUser = user.data();
      },
    );
  }

}
