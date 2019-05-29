import { Subscription } from 'rxjs';
import { HttpService } from '../../services/http.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { SimpleModalService } from 'ngx-simple-modal';

@Component({
  selector: 'app-show-tasks',
  templateUrl: './show-tasks.component.html',
  styleUrls: ['./show-tasks.component.css'],
})
export class ShowTasksComponent implements OnInit, OnDestroy {

  private subscriptionOfTaskOperations: Subscription;
  private subscriptionOfTaskRemoval: Subscription;
  private tasks: Array<Task>;
  private reverse: boolean = false;
  private key: string = 'name';
  private p: number = 1;

  private page: number = 0;
  private pages: Array<number>;

  constructor(private _myService: HttpService, private simpleModalService: SimpleModalService) { }

  ngOnInit() {
    this.getAllTasks();
    this.getPageOfTasks();

    this.subscriptionOfTaskOperations = this._myService.getObservableOfTask().subscribe(
      data => {
        this.handleSubOfTaskOperations(data);
      }
    );

    this.subscriptionOfTaskRemoval = this._myService.getObservableOfRemovedTask().subscribe(
      data => {
        this.handleSubOfTaskRemoval(data);
      }
    )
  }

  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  getAllTasks() {
    this._myService.getAllTasks().subscribe(
      data => {
        this.tasks = data;
      })
  }

  // tutaj chyba założenie jest takie, że wszystkie dane, które posiadam to ta jedna strona tasków (np 5 sztuk)
  // i to na nich operuję. Za kazdym razem gdy coś się zmienia to wołam z api jeszcze raz tę stronę ze zmianami
  // wynika z tego to, że nie moge ingerować w kolejność tasków w bazie danych bo inaczej za każdym razem będę na tej samej stronie
  // dostawał inne rezultaty

  getPageOfTasks(){
    this._myService.getPageOfTasks(this.page).subscribe(
      data => {
        this.tasks = data;
      }
    )
  }

  refreshAll() {
    this._myService.getAllTasks().subscribe(
      data => {
        this.tasks.forEach(function (task: Task) {
          task.assignValuesOf(data.find(x => x.id === task.id))
        })
      })
  }

  //musze się zastanowić czy nie lepiej będzie tu po prostu wołać za każdym razem nową stronę z api
  //w końcu to przypisywanie tylko tych kilku tasków

  handleSubOfTaskOperations(data: Task) {
    let task: Task = this.tasks.find(x => x.id === data.id);
    if (task !== undefined) {
      task.assignValuesOf(data);
    }
    else {
      this.tasks.push(data);
    }
  }

  handleSubOfTaskRemoval(data: number) {
    let task: Task = this.tasks.find(x => x.id === data);
    if (task !== undefined) {
      this.tasks = this.tasks.filter(function (_task) {
        return _task.id !== task.id;
      })
    }
  }

  ngOnDestroy() {
    this.subscriptionOfTaskOperations.unsubscribe();
    this.subscriptionOfTaskRemoval.unsubscribe();
  }
}