import { Injectable, InjectionToken } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponseBase, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs/Rx';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Task } from './models/task.model';
import { SimpleModalService } from 'ngx-simple-modal';
import { InfoPopupComponent } from './components/info-popup/info-popup.component';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  subjectOfErrors: Subject<string> = new Subject();

  constructor(private simpleModalService: SimpleModalService) {
    console.log('InterceptorService constructor');
  }

  intercept(interceptedReq: HttpRequest<any>, httpHander: HttpHandler): Observable<HttpEvent<any>> {
    this.subjectOfErrors.next('dupa');
    return httpHander.handle(interceptedReq)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  handleError(error: HttpErrorResponse) {
    console.log('insidde errorOccurredInfo')
    this.simpleModalService.addModal(InfoPopupComponent, {
      message: 'Popup from Http_interceptor ' + JSON.stringify(error.error)
    }).subscribe();

    
    let task = new Task();
    task.name = 'gówno';
    this.subjectOfErrors.next('gowno');
    console.log('error caught in HttpInterceptorrrr: ' + JSON.stringify(error.error));
    return throwError(error);
  }
}
