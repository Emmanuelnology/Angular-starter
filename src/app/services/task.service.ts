import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

export interface ITask{
  isChecked:boolean,
  title:string,
  priority:string
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private authService:AuthService) { }

  getCurrentUsersTasks(){
    return this.getByUser(this.getCurrentUserID());
  }

  getCurrentUserID(){
    return this.authService.getCurrentUser().sub;
  }

  getRefFromID(id){
    return 'tasks-' + id;
  }

  getByUser(userID){
    let ref=this.getRefFromID(userID);
    return JSON.parse(
      localStorage.getItem(ref)
      );
  }

  putTasksInLocalStorage(tasks) {
    let ref=this.getRefFromID(this.getCurrentUserID());
    localStorage.setItem(ref,JSON.stringify(tasks));
    return this.getByUser(this.getCurrentUserID());

  }

  add(task:ITask){
    let tasks=this.getByUser(this.getCurrentUserID());
    if(tasks)
      tasks.unshift(task);
    else 
      tasks=[task]
    return this.putTasksInLocalStorage(tasks);
    ;
  }

  toggle(key:number){
    let tasks=this.getCurrentUsersTasks();
    tasks[key].isChecked=!tasks[key].isChecked;
    return this.putTasksInLocalStorage(tasks);
  }

  delete(key:number){
    let tasks=this.getCurrentUsersTasks();
    tasks.splice(key,1);
    return this.putTasksInLocalStorage(tasks);
  }
}
