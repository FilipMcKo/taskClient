import { TaskCreationRequest } from './models/taskCreationRequest.model';
import { Injectable } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Rx';
import { of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl: string = "http://localhost:8080";
  private subjectOfTask: Subject<Task> = new Subject();
  private subjectOfRemovedTask: Subject<number> = new Subject();
  private subjectOfErrors: Subject<any> = new Subject();

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
    this._http.get(this.baseUrl + '/tasks/' + taskId).pipe(
      catchError(err => of([]))
    ).subscribe(
      data => {
        this.subjectOfTask.next(new Task().deserialize(data));
      }
    );
  }

  removeTask(taskId: number) {
    return this._http.delete(this.baseUrl + '/tasks/' + taskId).pipe(
      catchError(err => of([]))
    ).subscribe(
      data => {
        this.subjectOfRemovedTask.next(<number>data);
      }
    )
  }

  addNewTask(taskCreationRequest: TaskCreationRequest) {
    this._http.post(this.baseUrl + '/tasks', taskCreationRequest).pipe(
      catchError(err => of([]))
    ).subscribe(
      data => {
        this.subjectOfTask.next(new Task().deserialize(data));
      },
      err => {
        this.subjectOfErrors.next(err);
      }
    );
  }

  startProcessingTask(task: Task) {
    this._http.put(this.baseUrl + '/tasks/' + task.id + '/start', null).pipe(
      catchError(err => of([]))
    ).subscribe(
      (data) => {
        this.subjectOfTask.next(new Task().deserialize(data));
      },
      (err) => {
        this.subjectOfErrors.next(err);
      },
      () => {
        console.log('http stream completed');
      }
    );
  }

  cancelProcessingTask(task: Task) {
    this._http.put(this.baseUrl + '/tasks/' + task.id + '/cancel', null).pipe(
     catchError(
       err => {
        //this.subjectOfErrors.next(err);
         return of (err);
       }
     )
    ).subscribe(
      (data) => {
        this.subjectOfTask.next(new Task().deserialize(data));
      },
      (err) => {
        console.log(err);
      }
    );
  }
}