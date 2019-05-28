import { HttpErrorResponse, HTTP_INTERCEPTORS, HttpInterceptor } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { TaskService } from '../../task.service';
import { Component, OnInit, Injectable, OnDestroy, ErrorHandler, Inject } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { SimpleModalService } from 'ngx-simple-modal';
import { InfoPopupComponent } from '../info-popup/info-popup.component';
import { InterceptorService } from 'src/app/interceptor.service';
import { GlobalErrorService } from 'src/app/global-error.service';


@Component({
  selector: 'app-show-tasks',
  templateUrl: './show-tasks.component.html',
  styleUrls: ['./show-tasks.component.css'],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  } ]
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

  constructor(private _myService: TaskService, private simpleModalService: SimpleModalService, @Inject(HTTP_INTERCEPTORS) private interceptorService: InterceptorService) { 
    
  }
  //private interceptorService: InterceptorService,
  //, private globalErrorService: GlobalErrorService

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

    let X = this.interceptorService.getObservableOfErrors();
    this.subscriptionOfErrors = X.subscribe(
      data => {
        console.log('interceptorServeice.getObservableOfErrors().subscribe -> data');
        this.errorOccuredInfo(data);
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

  // te dwie metody mogłyby byc w osobnym komponencie - byłby miło

  taskAddedInfo(data: Task) {
    let disposable = this.simpleModalService.addModal(InfoPopupComponent, {
      message: 'Task has been created: ' + data.name
    }).subscribe();
    setTimeout(() => {
      disposable.unsubscribe();
    }, 2000);
  }

  errorOccuredInfo(error: any) {
    console.log('insidde errorOccurredInfo')
    this.simpleModalService.addModal(InfoPopupComponent, {
      message: 'Error occured: ' + JSON.stringify(error.error)
    }).subscribe();
  }

  ngOnDestroy() {
    this.subscriptionOfTaskOperations.unsubscribe();
    this.subscriptionOfTaskRemoval.unsubscribe();
    //this.subscriptionOfErrors.unsubscribe();
  }
}