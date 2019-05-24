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

  it('should change "reverse" and "key" variables', () => {
    expect(component.reverse).toBe(false);
    expect(component.key).toBe('name');
    component.sort('description');
    expect(component.reverse).toBe(true);
    expect(component.key).toBe('description');
  });

  it('should add Task, return it and add to tasks array', () => {

  });

  it('should add task and then remove it', () => {

  });

  it('should start processing task', () => {
    component.startProcessingTask(dummyTask);
    expect(dummyTask.currentState).toEqual("RUNNING");
  });

  it('should cancel processing task', () => {
    component.cancelProcessingTask(dummyTask);
    expect(dummyTask.currentState).toEqual("NEW");
    component.startProcessingTask(dummyTask);
    component.cancelProcessingTask(dummyTask);
    expect(dummyTask.currentState).toEqual("CANCELLED");
    expect(dummyTask.progressPercentage).toEqual(0);
  });
});
