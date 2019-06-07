import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { debug } from 'util';
import { Task } from '../../models/task.model';
import { ShowTasksComponent } from './show-tasks.component';

describe('TaskComponent', () => {
  let component: ShowTasksComponent;
  let fixture: ComponentFixture<ShowTasksComponent>;
  let dummyTask: Task;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShowTasksComponent],
      imports: [
        NgxPaginationModule,
        Ng2OrderModule,
        HttpClientModule
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dummyTask = new Task();
    dummyTask.id = 1;
    dummyTask.name = 'Task1';
    dummyTask.currentState = 'NEW';
    dummyTask.description = 'Description';
    dummyTask.progressPercentage = 0;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
