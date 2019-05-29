import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../models/task.model';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-cancel-task',
  templateUrl: './cancel-task.component.html',
  styleUrls: ['./cancel-task.component.css']
})
export class CancelTaskComponent {

  @Input()
  task: Task;

  constructor(private _myService: HttpService) { }

  cancelProcessingTask(task: Task) {
    this._myService.cancelProcessingTask(task);
  }
}
