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

  getAll(){
    return this.getTasksFromLocalStorage();
  }

  getUserTaskReference(){
    return 'tasks-' + this.authService.getCurrentUser().sub;
  }

  getTasksFromLocalStorage(){
    return JSON.parse(localStorage.getItem(this.getUserTaskReference()));
  }

  putTasksInLocalStorage(tasks) {
    
    localStorage.setItem(this.getUserTaskReference(),JSON.stringify(tasks));
    return this.getTasksFromLocalStorage();

  }

  add(task:ITask){
    let tasks=this.getTasksFromLocalStorage();
    if(tasks)
      tasks.unshift(task);
    else 
      tasks=[task]
    return this.putTasksInLocalStorage(tasks);
    ;
  }

  toggle(key:number){
    let tasks=this.getTasksFromLocalStorage();
    tasks[key].isChecked=!tasks[key].isChecked;
    return this.putTasksInLocalStorage(tasks);
  }

  delete(key:number){
    let tasks=this.getTasksFromLocalStorage();
    tasks.splice(key,1);
    return this.putTasksInLocalStorage(tasks);
  }
}
