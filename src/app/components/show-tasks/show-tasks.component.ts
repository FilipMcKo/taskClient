import { Subscription } from 'rxjs';
import { TaskService } from '../../task.service';
import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { SimpleModalService } from 'ngx-simple-modal';
import { InfoPopupComponent } from '../info-popup/info-popup.component';


@Component({
  selector: 'app-show-tasks',
  templateUrl: './show-tasks.component.html',
  styleUrls: ['./show-tasks.component.css']
})
export class ShowTasksComponent implements OnInit, OnDestroy {

  private subscriptionOfTaskOperations: Subscription;
  private subscriptionOfTaskRemoval: Subscription;
  private subscriptionOfErrors: Subscription;
  private tasks: Array<Task>;
  private reverse: boolean = false;
  private key: string = 'name';
  private p: number = 1;
  // properties to be used while implementing pagination in backend
  // private page: number = 0;
  // private pages: Array<number>;

  constructor(private _myService: TaskService, private simpleModalService: SimpleModalService) { }

  ngOnInit() {
    this.getAllTasks();

    this.subscriptionOfTaskOperations = this._myService.getObservableOfTask().subscribe(
      data => {
        this.handleSubOfTaskOperations(data);
      }
    );

    this.subscriptionOfTaskRemoval = this._myService.getObservableOfRemovedTask().subscribe(
      data => {
        this.handleSubOfTaskRemoval(data);
      }
    )

    this.subscriptionOfErrors = this._myService.getObservableOfErrors().subscribe(
      data => {
        console.log(data.message);
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

  refreshAll() {
    this._myService.getAllTasks().subscribe(
      data => {
        this.tasks.forEach(function (task: Task) {
          task.assignValuesOf(data.find(x => x.id === task.id))
        })
      })
  }

  handleSubOfTaskOperations(data: Task) {
    let task: Task = this.tasks.find(x => x.id === data.id);
    if (task !== undefined) {
      task.assignValuesOf(data);
    }
    else {
      this.tasks.push(data);
      this.taskAddedInfo(data);
    }
  }

  handleSubOfTaskRemoval(data: number) {
    let task: Task = this.tasks.find(x => x.id === data);
    if (task !== undefined) {
      this.tasks = this.tasks.filter(function (_task) {
        return _task.id !== task.id;
      })
    }
  }

  handleErrorOfTaskOperations(error) {
    let disposable = this.simpleModalService.addModal(InfoPopupComponent, {
      message: 'Error occured: ' + error
    }).subscribe();
  }

  taskAddedInfo(data: Task) {
    let disposable = this.simpleModalService.addModal(InfoPopupComponent, {
      message: 'Task has been created: ' + data.name
    }).subscribe();
    setTimeout(() => {
      disposable.unsubscribe();
    }, 2000);
  }

  ngOnDestroy() {
    this.subscriptionOfTaskOperations.unsubscribe();
    this.subscriptionOfTaskRemoval.unsubscribe();
  }
}