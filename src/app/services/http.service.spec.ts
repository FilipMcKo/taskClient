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

  afterEach(() => {
    httpMock.verify(); // weryfikuje czy nie ma jakichś oczekujących niezrealizowanych zapytań
  });


  it('should retrieve tasks from the API via GET', () => {
    service.getAllTasks().subscribe(tasks => {
      expect(tasks.length).toBe(2);  //dummyTasks zastępują zawartość faktycznego zwrotu z API i sprawdzają ich poprawność - ale w którym momecie dokładnie dummyTasks są tu wciskane?
      expect(tasks).toEqual(<Task[]>dummyTasks);
    });
    const request = httpMock.expectOne(service.baseUrl + '/tasks'); //sprawdza czy url request jest poprawny
    expect(request.request.method).toBe('GET'); //sprawdza czy wołane jest odpowiednie zapytanie http
    request.flush(dummyTasks);
  });


  it('should retireve task from API by Id via GET', () => {
    service.getTaskById(1).subscribe(task => {
      expect(task).toEqual(<Task>dummyTask);
    });
    const request = httpMock.expectOne(service.baseUrl + '/tasks/1'); //sprawdza czy url request jest poprawny
    expect(request.request.method).toBe('GET'); //sprawdza czy wołane jest odpowiednie zapytanie http
    request.flush(dummyTask);
  });


  it('should remove task from API by Id via DELETE', () => {
    service.removeTask(1).subscribe(); //usuwam taska o numerze 1
    const request = httpMock.expectOne(service.baseUrl + '/tasks/1'); //sprawdza czy url request jest poprawny
    expect(request.request.method).toBe('DELETE'); //sprawdza czy wołane jest odpowiednie zapytanie http
    request.flush(dummyTasks);
  });


  it('should return Observable that matches data', () => {
    service.addNewTask(dummyTask.name, dummyTask.description).subscribe(data => {
      expect(new Task().deserialize(data).name).toEqual('Task1');
    });
    const request = httpMock.expectOne(service.baseUrl + '/tasks?decription=Description&name=Task1');
    expect(request.request.method).toBe('POST');
    request.flush(dummyTask);
  });


  it('should request update od state from API via PUT (startProcessingTask)', () => {
    service.startProcessingTask(dummyTask.id).subscribe();
    const request = httpMock.expectOne(service.baseUrl + '/tasks/1/start');
    expect(request.request.method).toBe('PUT');
    request.flush(dummyTask);
  });


  it('should request update od state from API via PUT (cancelProcessingTask)', () => {
    service.cancelProcessingTask(dummyTask.id).subscribe();
    const request = httpMock.expectOne(service.baseUrl + '/tasks/1/cancel');
    expect(request.request.method).toBe('PUT');
    request.flush(dummyTask);
  });
});


