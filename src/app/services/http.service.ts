import { TaskCreationRequest } from '../models/taskCreationRequest.model';
import { Injectable } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseUrl: string = "http://localhost:8080";
  private subjectOfTask: Subject<Task> = new Subject();
  private mapper = (data) => this.subjectOfTask.next(new Task().deserialize(data));

  constructor(private _http: HttpClient) { }

  getObservableOfTask() {
    return this.subjectOfTask.asObservable();
  }

  getPageOfTasksSorted(page: number, key: string, desc: string) {
    return this._http.get<Task[]>(this.baseUrl + "/tasksPageSorted?pageNr=" + page + "&key=" + key + "&desc=" + desc);
  }

  getTaskById(taskId: number) {
    this._http.get(this.baseUrl + '/tasks/' + taskId).subscribe(
      this.mapper
    );
  }

  removeTask(taskId: number) {
    return this._http.delete(this.baseUrl + '/tasks/' + taskId).subscribe(
      this.mapper
    )
  }

  addNewTask(taskCreationRequest: TaskCreationRequest) {
    this._http.post(this.baseUrl + '/tasks', taskCreationRequest).subscribe(
      this.mapper
    );
  }

  startProcessingTask(task: Task) {
    this._http.put(this.baseUrl + '/tasks/' + task.id + '/start', null).subscribe(
        this.mapper
      );
  }

  cancelProcessingTask(task: Task) {
    this._http.put(this.baseUrl + '/tasks/' + task.id + '/cancel', null).subscribe(
        this.mapper
      );
  }
}