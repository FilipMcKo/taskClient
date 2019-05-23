import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SimpleModalComponent, SimpleModalService } from 'ngx-simple-modal';
import { ConfirmComponent } from '../confirm/confirm.component';
import { Task } from 'src/app/models/task.model';
import { Subscription } from 'rxjs';
import { TaskService } from 'src/app/task.service';

export interface ConfirmModel {
  message: string;
}

@Component({
  selector: 'app-info-popup',
  templateUrl: './info-popup.component.html',
  styleUrls: ['./info-popup.component.css']
})
export class InfoPopupComponent extends SimpleModalComponent<ConfirmModel, boolean> implements ConfirmModel, OnInit, OnDestroy {

  @Input()
  private task: Task;
  private tasks: Array<Task>;
  message: string;
  private subscriptionOfTaskOperations: Subscription;
  private subscriptionOfTaskRemoval: Subscription;
  
  constructor(private simpleModalService: SimpleModalService, private _myService: TaskService) {
    super();
  }

  ngOnInit(): void {
    this.subscriptionOfTaskOperations = this._myService.getCommonObservableOfTask().subscribe(
      data => {
        let task: Task = this.tasks.find(x => x.id === data.id);
        if (task !== undefined) {
          task.assignValuesOf(data);
          //this.showInfo(data);
        }
        else {
          this.tasks.push(data);
          //this.showInfo(data);
        }
      }
    );
  }

  getAllTasks() {
    this._myService.getAllTasks().subscribe(
      data => {
        this.tasks = data;
      })
  }

  confirm() {
    this.result = true;
    //na koniec sprobowac usunac ta metode i wywolac bezposrednio close w htmlu
    this.close();
  }

  showInfo(task: Task) {
    console.log("call from showInfo");
    let disposable = this.simpleModalService.addModal(ConfirmComponent, {
      message: ('Tekst o wydarzeniu dotyczącym danego taska' + task.name)
    }).subscribe((isConfirmed) => {
      if (isConfirmed) { }
    });

    setTimeout(() => {
      disposable.unsubscribe();
    }, 10000);
  }

  ngOnDestroy() {
    this.subscriptionOfTaskOperations.unsubscribe();
    this.subscriptionOfTaskRemoval.unsubscribe();
  }
}
