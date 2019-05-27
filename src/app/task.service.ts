import { TaskCreationRequest } from './models/taskCreationRequest.model';
import { Injectable } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Rx';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl: string = "http://localhost:8080";
  private subjectOfTask: Subject<Task> = new Subject();
  private subjectOfRemovedTask: Subject<number> = new Subject();
  private subjectOfAllTasks: Subject<Task[]> = new Subject();

  constructor(private _http: HttpClient) { }

  getCommonObservableOfTask() {
    return this.subjectOfTask.asObservable();
  }

  getObservableOfRemovedTask() {
    return this.subjectOfRemovedTask.asObservable();
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
    this._http.post(this.baseUrl + '/tasks', taskCreationRequest).subscribe(
      data => {
        this.subjectOfTask.next(new Task().deserialize(data));
      }
    );
  }

  startProcessingTask(task: Task) {
    this._http.put(this.baseUrl + '/tasks/' + task.id + '/start', null).subscribe(
      data => {
        this.subjectOfTask.next(new Task().deserialize(data));
      }
    );
  }

  cancelProcessingTask(task: Task) {
    this._http.put(this.baseUrl + '/tasks/' + task.id + '/cancel', null).subscribe(
      data => {
        this.subjectOfTask.next(new Task().deserialize(data));
      }
    );
  }

}