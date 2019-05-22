import { TaskCreationRequest } from './../models/taskCreationRequest.model';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.component.html',
  styleUrls: ['./add-new-task.component.css']
})
export class AddNewTaskComponent {

  private _taskCreationRequest: TaskCreationRequest = new TaskCreationRequest();

  constructor(private _myService: TaskService) { }

  addNewTask() {
    this._myService.addNewTask(this._taskCreationRequest);
    this._taskCreationRequest.resetValues();
  }
}
