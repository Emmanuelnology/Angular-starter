import { Component, OnInit } from '@angular/core';
import { TaskService,ITask } from '../services/task.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

  tasks:ITask[];
  isValid:boolean=false;

  constructor(private taskService:TaskService) { }

  validate(title){
    this.isValid=(title.value.length>0);
  }

  ngOnInit() {
    this.tasks=this.taskService.getAll();
  }

  addTask(title:HTMLInputElement,priority:HTMLSelectElement){
   let newTask:ITask={
      isChecked: false,
      title: title.value,
      priority: priority.value
    };
    
    title.value='';
    priority.value="Low";
    this.tasks=this.taskService.add(newTask);
  }

  toggleTask(key:number){
    this.tasks=this.taskService.toggle(key);
  }

  deleteTask(key:number){
    this.tasks=this.taskService.delete(key);
   }

}
