import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Task } from '../models/task.model';

describe('TaskService', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;
  const dummyTasks = [
    { id: 1, name: 'Task1', description: 'Description', currentState: 'NEW', progressPercentage: 0 },
    { id: 2, name: 'Task2', description: 'Description', currentState: 'NEW', progressPercentage: 0 }
  ];
  const dummyTask = { id: 1, name: 'Task1', description: 'Description', currentState: 'NEW', progressPercentage: 0 } 

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpService],
      imports: [HttpClientTestingModule]
    }).compileComponents();

    service = TestBed.get(HttpService);
    httpMock = TestBed.get(HttpTestingController);
  });

});


