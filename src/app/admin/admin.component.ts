
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { IUser, UserService } from './../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  hideSpinner:boolean;
  users:IUser[];

  constructor(private userService: UserService, private taskService:TaskService) { }

  ngOnInit() {

      this.userService.getUsers()
      .subscribe(
        users => {
          this.users = (users as IUser[]);
          this.hideSpinner=true;
          
          for (let user of this.users) {
            let taskList=this.taskService.getByUser(user.id);
            if(taskList)
              user.taskCount=taskList.length;
            else
            user.taskCount=0;
          }
        

          

        },
        error=>{
          console.log(error);
        }
        );

  }
}
