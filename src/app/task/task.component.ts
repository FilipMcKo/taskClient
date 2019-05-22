import { Subscription } from 'rxjs';
import { TaskService } from '../task.service';
import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { Task } from 'src/app/models/task.model';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, OnDestroy {

  private subscriptionOfTaskOperations: Subscription;
  private subscriptionOfTaskRemoval: Subscription;
  private tasks: Array<Task>;
  private reverse: boolean = false;
  private key: string = 'name';
  private p: number = 1;
  // properties to be used while implementing pagination in backend
  // private page: number = 0;
  // private pages: Array<number>;
    
  constructor(private _myService: TaskService) { }

  ngOnInit() {
    this.getAllTasks();

    this.subscriptionOfTaskOperations = this._myService.getCommonObservableOfTask().subscribe(
      data => {
        let task: Task = this.tasks.find(x => x.id === data.id);
        if (task !== undefined) {
          task.assignValuesOf(data);
        }
        else {
          this.tasks.push(data);
        }
      }
    );

    this.subscriptionOfTaskRemoval = this._myService.getObservableOfRemovedTask().subscribe(
      data => {
        let task: Task = this.tasks.find(x => x.id === data);
        if (task !== undefined) {
          this.tasks = this.tasks.filter(function (_task) {
            return _task.id !== task.id;
          })
        }
      }
    )
  }

  ngOnDestroy() {
    this.subscriptionOfTaskOperations.unsubscribe();
    this.subscriptionOfTaskRemoval.unsubscribe();
  }

  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  getAllTasks() {
    this._myService.getAllTasks().subscribe(
      data => {
        this.tasks = data;
      })
  }

  removeTask(task: Task) {
    this._myService.removeTask(task.id);
  }

  startProcessingTask(task: Task) {
    this._myService.startProcessingTask(task);
  }

  cancelProcessingTask(task: Task) {
    this._myService.cancelProcessingTask(task);
  }

}

//TODO: obsługa błędów które dostaję od api powinny się odbywać w jakimś httpHandlerze, zeby nie duplikować kodu w każdym subscribe
//TODO: jakies popupy informujące o wydarzeniu
