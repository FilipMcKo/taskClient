import { Subscription } from 'rxjs';
import { TaskService } from '../../task.service';
import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { Task } from 'src/app/models/task.model';


@Component({
  selector: 'app-show-tasks',
  templateUrl: './show-tasks.component.html',
  styleUrls: ['./show-tasks.component.css']
})
export class ShowTasksComponent implements OnInit, OnDestroy {

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

  ngOnDestroy() {
    this.subscriptionOfTaskOperations.unsubscribe();
    this.subscriptionOfTaskRemoval.unsubscribe();
  }
}

//TODO: obsługa błędów które dostaję od api powinny się odbywać w jakimś httpHandlerze, zeby nie duplikować kodu w każdym subscribe
//TODO: jakies popupy informujące o wydarzeniu
