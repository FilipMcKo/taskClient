import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-remove-task',
  templateUrl: './remove-task.component.html',
  styleUrls: ['./remove-task.component.css']
})
export class RemoveTaskComponent {

  @Input()
  task: Task;

  constructor(private _myService: TaskService) { }

  removeTask(task: Task) {
    this._myService.removeTask(task.id);
  }
}
