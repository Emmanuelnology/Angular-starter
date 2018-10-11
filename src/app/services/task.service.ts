import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

export interface ITask {
  isChecked: boolean;
  title: string;
  priority: string;
}

@Injectable({
  providedIn: "root",
})
export class TaskService {

  constructor(private authService: AuthService) { }

  public getCurrentUsersTasks() {
    return this.getByUser(this.getCurrentUserID());
  }

  public getCurrentUserID() {
    return this.authService.getCurrentUser().sub;
  }

  public getRefFromID(id) {
    return "tasks-" + id;
  }

  public getByUser(userID) {
    const ref = this.getRefFromID(userID);
    return JSON.parse(
      localStorage.getItem(ref),
      );
  }

  public putTasksInLocalStorage(tasks) {
    const ref = this.getRefFromID(this.getCurrentUserID());
    localStorage.setItem(ref, JSON.stringify(tasks));
    return this.getByUser(this.getCurrentUserID());

  }

  public add(task: ITask) {
    let tasks = this.getByUser(this.getCurrentUserID());
    if (tasks) {
      tasks.unshift(task);
    } else {
      tasks = [task];
    }
    return this.putTasksInLocalStorage(tasks);

  }

  public toggle(key: number) {
    const tasks = this.getCurrentUsersTasks();
    tasks[key].isChecked = !tasks[key].isChecked;
    return this.putTasksInLocalStorage(tasks);
  }

  public delete(key: number) {
    const tasks = this.getCurrentUsersTasks();
    tasks.splice(key, 1);
    return this.putTasksInLocalStorage(tasks);
  }
}
