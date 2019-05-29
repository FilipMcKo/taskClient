import { Component, OnInit } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { Task } from 'src/app/models/task.model';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { InfoPopupComponent } from '../info-popup/info-popup.component';

@Component({
  selector: 'app-task-added-popup',
  templateUrl: './task-added-popup.component.html',
  styleUrls: ['./task-added-popup.component.css']
})
export class TaskAddedPopupComponent implements OnInit {
  private subscriptionOfNewTasks: Subscription;

  constructor(private _myService: HttpService, private simpleModalService: SimpleModalService) { }

  ngOnInit() {
    this.subscriptionOfNewTasks = this._myService.getObservableOfTask().subscribe(
      data => {
        this.handleSubOfTaskOperations(data);
      })
  }

  handleSubOfTaskOperations(data: Task) {
    if (data.currentState === "NEW") {
      let disposable = this.simpleModalService.addModal(InfoPopupComponent, {
        message: 'Task has been created: ' + data.name
      }).subscribe();
      setTimeout(() => {
        disposable.unsubscribe();
      }, 2000);
    }
  }
}
