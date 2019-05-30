import { Subscription } from 'rxjs';
import { HttpService } from '../../services/http.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-show-tasks',
  templateUrl: './show-tasks.component.html',
  styleUrls: ['./show-tasks.component.css'],
})
export class ShowTasksComponent implements OnInit, OnDestroy {

  private subscriptionOfTaskOperations: Subscription;
  private subscriptionOfTaskRemoval: Subscription;
  private tasks: Array<Task>;
  private page: number = 0;
  private pages: Array<number>;
  private key: string = '';
  private descending: boolean = false;

  constructor(private _myService: HttpService) { }

  ngOnInit() {
    this.getPageOfTasks();
    this.subscriptionOfTaskOperations = this._myService.getObservableOfTask().subscribe(
      data => {
        this.getPageOfTasks();
      }
    );
  }

  sort(key: string) {
    if (this.key === key) {
      this.descending = !this.descending;
    }
    if (this.key !== key) {
      this.descending = false;
    }
    this.key = key;
    this.getPageOfTasks();
  }

  loadPage(page) {
    if (page < 0 || page > this.pages.length - 1) {
      return;
    }
    this.page = page;
    console.log('page: ' + page);
    this.getPageOfTasks();
  }

  getPageOfTasks() {
    this._myService.getPageOfTasksSorted(this.page, this.key, this.toString(this.descending)).subscribe(
      data => {
        this.tasks = data['content'];
        this.pages = new Array(data['totalPages']);
      }
    )
  }

  ngOnDestroy() {
    this.subscriptionOfTaskOperations.unsubscribe();
    this.subscriptionOfTaskRemoval.unsubscribe();
  }

  toString(value: boolean): string {
    if (value) {
      return "true";
    }
    return "false";
  }
}