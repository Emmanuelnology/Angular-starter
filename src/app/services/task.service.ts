import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface ITask {
  isComplete: boolean;
  title: string;
  priority: string;
}

@Injectable({
  providedIn: "root",
})

export class TaskService {
  public tasks: Observable<ITask[]>;
  private taskCollection: AngularFirestoreCollection<ITask>;

  constructor(
    private fireStore: AngularFirestore,
    ) {
      this.taskCollection = this.fireStore.collection<ITask>("tasks");
      this.tasks = this.taskCollection.valueChanges();
    }

  public getCurrentUsersTasks() {
    return this.getByUser(this.getCurrentUserID());
  }

  public getCurrentUserID() {
    return 1;
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
