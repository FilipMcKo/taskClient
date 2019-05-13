import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl:string = "http://localhost:8080";

  constructor(private _http:HttpClient) { }

  getAllTasksPaged(page:number){
    return this._http.get(this.baseUrl + '/tasksPage?page=' + page);
  }

  removeTask(taskId:number){
    return this._http.delete(this.baseUrl + '/tasks/' + taskId);
  }

  startProcessingTask(taskId:number){
    return this._http.put(this.baseUrl + '/tasks/' + taskId + '/start',null);
  }

  cancelProcessingTask(taskId:number){
    return this._http.put(this.baseUrl + '/tasks/' + taskId + '/cancel',null);
  }

}
