import { TaskCreationRequest } from './models/taskCreationRequest.model';
import { Injectable } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  baseUrl: string = "http://localhost:8080";

  constructor(private _http: HttpClient) { }

  getAllTasks() {
    return this._http.get<Task[]>(this.baseUrl + '/tasks').map(
      data => {
        return data.map((task: Task) => new Task().deserialize(task));
      }
    );
  }

  getTaskById(taskId: number) {
    this._http.get(this.baseUrl + '/tasks/' + taskId).map(
      data => {
        return new Task().deserialize(data);
      }
    );
  }

  removeTask(taskId: number) {
    return this._http.delete(this.baseUrl + '/tasks/' + taskId);
  }

  addNewTask(taskCreationRequest: TaskCreationRequest) {
    return this._http.post(this.baseUrl + '/tasks', taskCreationRequest).map(
      data => {
        return new Task().deserialize(data);
      }
    );
  }

  startProcessingTask(task: Task) {
    return this._http.put(this.baseUrl + '/tasks/' + task.id + '/start', null).map(
      data => {
        return new Task().deserialize(data);
      }
    );
  }

  cancelProcessingTask(task: Task) {
    return this._http.put(this.baseUrl + '/tasks/' + task.id + '/cancel', null).map(
      data => {
       return new Task().deserialize(data);
      }
    );
  }

}