import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../../task.service';
import { Task } from '../../models/task.model';
import { SimpleModalService } from 'ngx-simple-modal';
import { ConfirmComponent } from 'src/app/components/confirm/confirm.component';

@Component({
  selector: 'app-remove-task',
  templateUrl: './remove-task.component.html',
  styleUrls: ['./remove-task.component.css']
})
export class RemoveTaskComponent {

  @Input()
  task: Task;

  constructor(private _myService: TaskService, private simpleModalService: SimpleModalService) { }

  removeTask(task: Task) {
    this.simpleModalService.addModal(ConfirmComponent, {
      message: 'Are you sure you want to remove this task?'
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this._myService.removeTask(task.id);
      }
    });
  }
}
