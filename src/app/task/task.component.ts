import { TaskService } from './../task.service';
import { Component, OnInit } from '@angular/core';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  private page:number = 0;
  private tasks:Array<any>;
  private pages:Array<number>;

  constructor(private _myService:TaskService) { }
  setPage(i, event:any){
      event.preventDefault();
      this.page=i;
      this.getAllTasksPaged();
  }

  ngOnInit() {
    this.getAllTasksPaged();
  }

  getAllTasksPaged(){
    this._myService.getAllTasksPaged(this.page).subscribe(
      data=>{
        this.tasks = data['content'];
        this.pages = new Array(data['totalPages'])
      },
      (error)=>{
        error.console.error();
      }
    );
  }

}
