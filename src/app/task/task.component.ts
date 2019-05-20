import { TaskService } from '../task.service';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';

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
        this.tasks = data.map((task: Task) => new Task().deserialize(task))
      }
    );
  }

  removeTask(task: Task) {
    this._myService.removeTask(task.id).subscribe();
    this.tasks = this.tasks.filter(function (_task) {
      return _task.id !== task.id;
    });
  }

  addNewTask(name: string, description: string) {
    let _this = this;
    this._myService.addNewTask(name, description).subscribe(
      data => {
        _this.tasks.push(new Task().deserialize(data));
      }
    );
  }

  startProcessingTask(task: Task) {
    task = this._myService.startProcessingTask(task);
    // this._myService.startProcessingTask(task).subscribe(
    //   data => {
    //     task = task.deserialize(data);
    //   }
    // )
  }

  cancelProcessingTask(task: Task) {
    this._myService.cancelProcessingTask(task.id).subscribe(data => {
      task = task.deserialize(data);
    });
  }
}