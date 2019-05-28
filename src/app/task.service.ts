import { TaskCreationRequest } from './models/taskCreationRequest.model';
import { Injectable } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Rx';
import { of, throwError, Observable, observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable'


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl: string = "http://localhost:8080";
  private subjectOfTask: Subject<Task> = new Subject();
  private subjectOfRemovedTask: Subject<number> = new Subject();
  private subjectOfErrors: Subject<HttpErrorResponse> = new Subject();

  constructor(private _http: HttpClient) { }

  getObservableOfTask() {
    return this.subjectOfTask.asObservable();
  }

  getObservableOfRemovedTask() {
    return this.subjectOfRemovedTask.asObservable();
  }

  getObservableOfErrors() {
    return this.subjectOfErrors.asObservable();
  }

  getAllTasks() {
    return this._http.get<Task[]>(this.baseUrl + '/tasks').map(
      data => {
        return data.map((task: Task) => new Task().deserialize(task));
      }
    );
  }

  getTaskById(taskId: number) {
    this._http.get(this.baseUrl + '/tasks/' + taskId).subscribe(
      data => {
        this.subjectOfTask.next(new Task().deserialize(data));
      }
    );
  }

  removeTask(taskId: number) {
    return this._http.delete(this.baseUrl + '/tasks/' + taskId).subscribe(
      data => {
        this.subjectOfRemovedTask.next(<number>data);
      }
    )
  }

  addNewTask(taskCreationRequest: TaskCreationRequest) {
    this._http.post(this.baseUrl + '/tasks', taskCreationRequest).pipe(
      catchError(err => {
        console.log('from inside of catchError in addNewTask', err.message);
        this.subjectOfErrors.next(err);
        return Observable.empty();
      })
    ).subscribe(
      (data) => {
        this.subjectOfTask.next(new Task().deserialize(data));
      },
      (err) => {
        console.log('error cougth in addNewTask.subscribe()');
      },
      () => {
        console.log("addNewTask stream completed");
      }
    );
  }

  startProcessingTask(task: Task) {
    this._http.put(this.baseUrl + '/tasks/' + task.id + '/start', null)
    .pipe(
      catchError(err => {
        console.log('from inside of catchError in startProcessing', err.message);
        this.subjectOfErrors.next(err);
        return Observable.empty();
      })
    ).subscribe(
      (data) => {
        this.subjectOfTask.next(new Task().deserialize(data));
      },
      (err) => {
        console.log('error cougth in startProcessing.subscribe()');
      },
      () => {
        console.log("start stream completed");
      }
    );
  }

  cancelProcessingTask(task: Task) {
    console.log('before http.put')
    this._http.put(this.baseUrl + '/tasks/' + task.id + '/cancel', null)
      // .pipe(
      //   catchError(
      //     err => {
      //       console.log('from inside of catchError in cancelProcessing', err.message);
      //       this.subjectOfErrors.next(err);
      //       return Observable.empty();
      //     }
      //   ))
      .subscribe(
        (data) => {
          this.subjectOfTask.next(new Task().deserialize(data));
        }
        // ,
        // (err) => {
        //   console.log('error cougth in cancelProcessing.subscribe()');
        // },
        // () => {
        //   console.log("cancel stream completed");
        // }
      );
  }


  // responseHandler(response){
  //   if(response instanceof HttpErrorResponse){
  //     console.log('did it just work?');
  //     this.subjectOfErrors.next(<HttpErrorResponse>response);
  //   }
  //   else{
  //     console.log('it is a proper object');
  //     this.subjectOfTask.next(new Task().deserialize(response));
  //   }
  //   return Observable.empty();
  // }

  // cancelProcessingTask(task: Task) {
  //   this._http.put(this.baseUrl + '/tasks/' + task.id + '/cancel', null).catch(this.responseHandler).subscribe(
  //     // (data) => {
  //     //   this.subjectOfTask.next(new Task().deserialize(data));
  //     // }
  //   );
  // }
}