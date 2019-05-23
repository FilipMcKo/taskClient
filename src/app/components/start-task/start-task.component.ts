import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../../task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-start-task',
  templateUrl: './start-task.component.html',
  styleUrls: ['./start-task.component.css']
})
export class StartTaskComponent {

  @Input()
  task: Task;

  constructor(private _myService: TaskService) {}

  startProcessingTask(task: Task) {
    this._myService.startProcessingTask(task);
  }

  
}
