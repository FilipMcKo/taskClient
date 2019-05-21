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

  constructor(private _myService: TaskService) {
  }

  ngOnInit() {
  }

  addNewTask() {
    let taskCreationRequest: TaskCreationRequest = new TaskCreationRequest(this.taskName, this.taskDescription);
    console.log('addNewTask: ' + taskCreationRequest.name + '  ' + taskCreationRequest.description);
    this._myService.addNewTask(taskCreationRequest).subscribe(
    
     //task => { taskComponent.tasks.push(task) }
    );
  }

}
