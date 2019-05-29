import { TaskCreationRequest } from '../../models/taskCreationRequest.model';
import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.component.html',
  styleUrls: ['./add-new-task.component.css']
})
export class AddNewTaskComponent {

  private _taskCreationRequest: TaskCreationRequest = new TaskCreationRequest();

  constructor(private _myService: HttpService) { }

  addNewTask() {
    this._myService.addNewTask(this._taskCreationRequest);
    this._taskCreationRequest.resetValues();
  }
}
