import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from 'src/app/models/task.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  baseUrl: string = "http://localhost:8080";

  constructor(private _http: HttpClient) { }

  getAllTasksPaged(page: number) {
    return this._http.get<Task[]>(this.baseUrl + '/tasksPage?page=' + page);
  }

  getAllTasks() {
    return this._http.get<Task[]>(this.baseUrl + '/tasks');
  }

  getTaskById(taskId: number) {
    return this._http.get(this.baseUrl + '/tasks/' + taskId);
  }

  removeTask(taskId: number) {
    return this._http.delete(this.baseUrl + '/tasks/' + taskId);
  }

  addNewTask(name: string, description: string) {
    return this._http.post(this.baseUrl + '/tasks?decription=' + description + '&name=' + name, null);
  }

  startProcessingTask(task: Task) {
    this._http.put(this.baseUrl + '/tasks/' + task.id + '/start', null).subscribe(
      data => {task = task.deserialize(data)}
    );
      return task;
  }

  cancelProcessingTask(taskId: number) {
    return this._http.put(this.baseUrl + '/tasks/' + taskId + '/cancel', null);
  }

}