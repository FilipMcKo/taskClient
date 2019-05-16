import { map, count } from 'rxjs/operators';
import { TaskService } from '../task.service';
import { Component, OnInit } from '@angular/core';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { TaskData } from '@angular/core/src/testability/testability';
import { Task } from 'src/app/models/task.model';
import { FLAGS } from '@angular/core/src/render3/interfaces/view';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  page:number = 0;
  tasks:Array<Task>;
  pages:Array<number>;
  key: string = 'name';
  reverse: boolean = false;
  p: number = 1;
  flag: boolean = false;

  constructor(private _myService:TaskService) { 
  }

  ngOnInit() {
    this.getAllTasks();
    //console.log(this.tasks.length);
  }

  // sortTasksByName(){
  //   this.tasks.sort((a, b) => a.name.localeCompare(b.name));
  // }

  // getAllTasksPaged(){
  //   this._myService.getAllTasksPaged(this.page).subscribe(
  //     data=>{
  //       this.tasks = data['content'].map((task: Task) => new Task().deserialize(task)),
  //       this.pages = new Array(data['totalPages'])
  //     }
  //   );
  // }

//   setPage(i:number, event:any){
//     event.preventDefault();
//     this.page=i;
//     this.getAllTasksPaged();
// }



  sort(key: string){
    this.key = key;
    this.reverse = !this.reverse;
  }

  getAllTasks(){
    this._myService.getAllTasks().subscribe(
      data=>{
        this.tasks = data.map((task: Task) => new Task().deserialize(task))
      }
    );
  }

  removeTask(taskId:number){
    this._myService.removeTask(taskId).subscribe();
    this.tasks = this.tasks.filter(function( task ) {
      return task.id !== taskId;
  });
  }

  addNewTask(name: string, description: string){
    console.log(this.tasks.length);
    var _this = this;
    this._myService.addNewTask(name, description).subscribe(
       data =>{_this.tasks.push(new Task().deserialize(data))}
    );
    console.log(this.tasks.length);
  }

  taskCantBeStarted(taskToStart: Task): boolean{
    let disabledTasks: Task[] = this.tasks.filter(function( task ) {
      return task.id !== taskToStart.id;
    });
    let thisTask: Task = disabledTasks.pop();
    if(thisTask.currentState==="NEW"){
      return true;
    }
    else{
      return false;
    }
  }

  startProcessingTask(task:Task){
    console.log('wystartowane: ' + task.name);
    this._myService.startProcessingTask(task.id).subscribe();
    task.currentState = 'RUNNING';
  }

  cancelProcessingTask(task:Task){
    this._myService.cancelProcessingTask(task.id).subscribe();
    task.currentState = 'CANCELLED';
  }
}

/*
Problemy:
1. Obiekt task nie jest komponentem i przez to (chyba) nie występuje u mnie two way binding w html (gdzie na buttonie ustawiam własność [disabled])
gdy w task.component dodałem flagę, która się zmienia w metodach to było dynamicznie ale taka flaga musi występować dla każdego
taska (w tablicy) oddzielnie i tego nie potrafię ogarnąć.


Rozmowa z ceglarzem:
1. przy brakujących testach, które należy dopisać spóbowałbym dopchnąć jakąś funkcjonalność, która jest "niezbędna" tak żeby ceglarz
zgodził się na dodanie tej fukcjonalności i wtedy bym mu powiedział, że to potrwa jeden dzień, a tak na prawdę potrwa pół godziny 
i tym sposobem mam jeden dodatkowy dzień na testy 
*/