import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-refresh-progress',
  templateUrl: './refresh-progress.component.html',
  styleUrls: ['./refresh-progress.component.css']
})
export class RefreshProgressComponent {

  @Input()
  task: Task;

  constructor(private _myService: TaskService) {}

  refreshTask(task: Task) {
    this._myService.getTaskById(task.id);
  }
}
