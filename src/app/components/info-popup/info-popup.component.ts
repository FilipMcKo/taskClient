import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { Task } from 'src/app/models/task.model';

export interface ConfirmModel {
  message: string;
}

@Component({
  selector: 'app-info-popup',
  templateUrl: './info-popup.component.html',
  styleUrls: ['./info-popup.component.css']
})
export class InfoPopupComponent extends SimpleModalComponent<ConfirmModel, boolean> implements ConfirmModel {

  message: string;
  task: Task;

  constructor() {
    super();
  }

  confirm() {
    this.close();
  }
}
