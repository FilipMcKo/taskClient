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

    this.subscriptionOfTaskOperations = this._myService.getCommonObservableOfTask().subscribe(
      data => {
        this.handleSubOfTaskOperations(data);
      }
    );

    this.subscriptionOfTaskRemoval = this._myService.getObservableOfRemovedTask().subscribe(
      data => {
        this.handleSubOfTaskRemoval(data);
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

  handleSubOfTaskRemoval(data: number){
    let task: Task = this.tasks.find(x => x.id === data);
    if (task !== undefined) {
      this.tasks = this.tasks.filter(function (_task) {
        return _task.id !== task.id;
      })
    }
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

//TODO: obsługa błędów które dostaję od api powinny się odbywać w jakimś httpHandlerze, zeby nie duplikować kodu w każdym subscribe
//TODO: jakies popupy informujące o wydarzeniu
