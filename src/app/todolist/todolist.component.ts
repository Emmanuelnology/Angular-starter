import { Component, OnInit } from "@angular/core";
import { ITask, TaskService } from "../services/task.service";

@Component({
  selector: "app-todolist",
  styleUrls: ["./todolist.component.css"],
  templateUrl: "./todolist.component.html",
})
export class TodolistComponent implements OnInit {

  public tasks: ITask[];
  public isValid = false;

  constructor(private taskService: TaskService) { }

  public validate(title) {
    this.isValid = (title.value.length > 0);
  }

  public ngOnInit() {
    this.tasks = this.taskService.getCurrentUsersTasks();
  }

  public addTask(title: HTMLInputElement, priority: HTMLSelectElement) {
   const newTask: ITask = {
      isComplete: false,
      priority: priority.value,
      title: title.value,
    };

   title.value = "";
   priority.value = "Low";
   this.tasks = this.taskService.add(newTask);
  }

  public toggleTask(key: number) {
    this.tasks = this.taskService.toggle(key);
  }

  public deleteTask(key: number) {
    this.tasks = this.taskService.delete(key);
   }

}
