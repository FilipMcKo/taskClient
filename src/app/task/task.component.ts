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
    this._myService.startProcessingTask(task).subscribe(
      _task => { task.assignValuesOf(_task); }
      // jeszcze jakiś popup informujący o dokonanaje zmianie (to samo w pozostałych metodach) - czyli implementacja jakiegoś equals
    );
  }

  cancelProcessingTask(task: Task) {
    this._myService.cancelProcessingTask(task).subscribe(
      _task => { task.assignValuesOf(_task); }
      // jeszcze jakiś popup informujący o dokonanaje zmianie (to samo w pozostałych metodach) - czyli implementacja jakiegoś equals
    );
  }
}

//TODO: obsługa błędów które dostaję od api powinny się odbywać w jakimś httpHandlerze, zeby nie duplikować kodu w każdym subscribe

