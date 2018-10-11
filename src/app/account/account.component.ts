import { Component, OnInit } from '@angular/core';
import { FbAuthService } from '../services/fb-auth.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  public taskCount;
  constructor(public authService: FbAuthService, private taskService: TaskService) { }

  ngOnInit() {
    const taskList = this.taskService.getByUser(this.authService.getCurrentUser().uid);
    if (taskList) {
      this.taskCount = taskList.length;
    } else {
    this.taskCount = 0;
    }
  }

}
