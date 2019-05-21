import { TaskCreationRequest } from './../models/taskCreationRequest.model';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.component.html',
  styleUrls: ['./add-new-task.component.css']
})
export class AddNewTaskComponent implements OnInit {

  taskName: string;
  taskDescription: string;
  _taskCreationRequest: TaskCreationRequest;
  constructor(private _myService: TaskService, private _taskComponent: TaskComponent) {
  }

  ngOnInit() {
    this._taskCreationRequest = new TaskCreationRequest("","");
  }

  addNewTask() {
    this._myService.addNewTask(this._taskCreationRequest).subscribe(
     task => { this._taskComponent.tasks.push(task) }
    );
  }

}
