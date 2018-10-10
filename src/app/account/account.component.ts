import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  public taskCount;
  constructor(public authService:AuthService, private taskService:TaskService) { }

  ngOnInit() {
    let taskList=this.taskService.getByUser(this.authService.getCurrentUser().sub);
    if(taskList)
      this.taskCount=taskList.length;
    else
    this.taskCount;
  }

}
