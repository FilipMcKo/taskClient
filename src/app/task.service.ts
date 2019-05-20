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

  getAllTasks() {
    return this._http.get<Task[]>(this.baseUrl + '/tasks');
    // let tasks: Array<Task>;
    // let task: Task = new Task();
    // this._http.get<Task[]>(this.baseUrl + '/tasks').subscribe(
    //   data => { tasks = data.map((_task: Task) => task.deserialize(_task)),
    //   console.log(tasks.length)}
    // )
    
    // return tasks;
  }

  getTaskById(taskId: number) {
    var task: Task = new Task();
    this._http.get(this.baseUrl + '/tasks/' + taskId).subscribe(
      data => { task = task.deserialize(data);}
    );
    return task;
  }

  removeTask(taskId: number) {
    return this._http.delete(this.baseUrl + '/tasks/' + taskId);
  }

  addNewTask(name: string, description: string) {
    var task: Task = new Task();
    this._http.post(this.baseUrl + '/tasks?decription=' + description + '&name=' + name, null).subscribe(
      data => {
        task = task.deserialize(data);
      }
    )
    return task;
  }

  startProcessingTask(task: Task) {
    this._http.put(this.baseUrl + '/tasks/' + task.id + '/start', null).subscribe(
      data => { task = task.deserialize(data) }
    );
    return task;
  }

  cancelProcessingTask(task: Task) {
    this._http.put(this.baseUrl + '/tasks/' + task.id + '/cancel', null).subscribe(
      data => { task = task.deserialize(data) }
    );
    return task;
  }

}