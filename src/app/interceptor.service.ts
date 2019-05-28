import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponseBase, HttpResponse } from '@angular/common/http';
import { Observable, Subject  } from 'rxjs/Rx';
import {throwError} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Task } from './models/task.model';
import { ShowTasksComponent } from './components/show-tasks/show-tasks.component';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  subjectOfErrors: Subject<string> = new Subject();

  

  constructor(){
    console.log('InterceptorService constructor');
    let _this = this;
    //this.subjectOfErrors['dupa'] = 1;
    // this.subjectOfErrors.subscribe(data=>{
    //   //console.log(_this);
    //   console.log('from interceprtor subscibee')});
  }

  intercept(interceptedReq: HttpRequest<any>, httpHander: HttpHandler): Observable<HttpEvent<any>> {
    this.subjectOfErrors.next('dupa');
    return httpHander.handle(interceptedReq)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  handleError(error: HttpErrorResponse) {
    let task = new Task();
    task.name = 'gówno';
    this.subjectOfErrors.next('gowno');
    console.log('error caught in HttpInterceptorrrr: ' + JSON.stringify(error.error));
    return throwError(error);
  }

  getObservableOfErrors() {
    console.log('getObservableOfErrors from InterceptorService was called');
    return this.subjectOfErrors.asObservable();
  }
}
