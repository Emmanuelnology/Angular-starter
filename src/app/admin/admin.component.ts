
import { Component, OnInit } from "@angular/core";
import { TaskService } from "../services/task.service";
import { IUser, UserService } from "./../services/user.service";

@Component({
  selector: "app-admin",
  styleUrls: ["./admin.component.css"],
  templateUrl: "./admin.component.html",
})
export class AdminComponent implements OnInit {
  public hideSpinner: boolean;
  public users: IUser[];

  constructor(private userService: UserService, private taskService: TaskService) {}

  public ngOnInit() {

      this.userService.getUsers()
      .subscribe(
        (users) => {
          this.users = (users as IUser[]);
          this.hideSpinner = true;

          for (const user of this.users) {
            const taskList = this.taskService.getByUser(user.id);
            if (taskList) {
              user.taskCount = taskList.length;
            } else {
            user.taskCount = 0;
            }
          }

        },
        (error) => {
          throw new error("Error getting users");
        },
        );

  }
}
