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
}
