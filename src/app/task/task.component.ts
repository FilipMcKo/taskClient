import { TaskService } from '../task.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { Task } from 'src/app/models/task.model';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  page: number = 0;
  tasks: Array<Task>;
  pages: Array<number>;
  key: string = 'name';
  reverse: boolean = false;

  taskToBeCreated: Task;

  p: number = 1;

  constructor(private _myService: TaskService) {
  }

  ngOnInit() {
    this.getAllTasks();
    // this._myService.observableOfTaskChanges.subscribe(
    //   data => {
    //     let task: Task = this.tasks.find(x => x.id === data.id);
    //     task.assignValuesOf(data);
    //   }
    // )
  }

  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  getAllTasks() {
    this._myService.getAllTasks().subscribe(
      data => {
        console.log(data);
        this.tasks = data;
      })
  }

  removeTask(task: Task) {
    this._myService.removeTask(task.id).subscribe(
      data => {
        if (data === task.id) {
          this.tasks = this.tasks.filter(function (_task) {
            return _task.id !== task.id;
          })
        }
      }
    );
  }

  startProcessingTask(task: Task) {
    this._myService.startProcessingTask(task);
  }

  cancelProcessingTask(task: Task) {
    this._myService.cancelProcessingTask(task);
  }

}

//TODO: obsługa błędów które dostaję od api powinny się odbywać w jakimś httpHandlerze, zeby nie duplikować kodu w każdym subscribe
//TODO: jakies popupy informujące o wydarzeniu
