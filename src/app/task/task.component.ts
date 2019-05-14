import { map } from 'rxjs/operators';
import { TaskService } from '../task.service';
import { Component, OnInit } from '@angular/core';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { TaskData } from '@angular/core/src/testability/testability';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  private page:number = 0;
  private tasks:Array<Task>;
  private pages:Array<number>;
  private task:TaskData;

  constructor(private _myService:TaskService) { }

  ngOnInit() {
    this.getAllTasksPaged();
  }

  setPage(i:number, event:any){
      event.preventDefault();
      this.page=i;
      this.getAllTasksPaged();
  }

  sortTasksByName(){
    this.tasks.sort((a, b) => a.name.localeCompare(b.name));
  }

  getAllTasksPaged(){
    this._myService.getAllTasksPaged(this.page).subscribe(
      data=>{
        this.tasks = data['content'].map((task: Task) => new Task().deserialize(task)),
        this.pages = new Array(data['totalPages'])
      }
    );
  }

  removeTask(taskId:number){
    this._myService.removeTask(taskId).subscribe()
  }

  addNewTask(name: string, description: string){
    this._myService.addNewTask(name, description).subscribe();
  }


  /*
  te wszystkie metody poniżej mają bullshit w swoich ciałach 
  bo powinny mi zwracać jakoś response cody i message
  na razie to jest tymczasowa copypasta
  */
  startProcessingTask(taskId:number){
    this._myService.startProcessingTask(taskId).subscribe(
      resp=>{
        console.log(resp);
      },
      (error)=>{
        error.console.error();
      }
    )
  }

  cancelProcessingTask(taskId:number){
    this._myService.cancelProcessingTask(taskId).subscribe(
      resp=>{
        console.log(resp);
      },
      (error)=>{
        error.console.error();
      }
    )
  }

}
