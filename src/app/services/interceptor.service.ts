import { ErrorHandlerService } from './error-handler.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { catchError } from 'rxjs/operators';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private errorHandlerService: ErrorHandlerService) { }

  intercept(interceptedReq: HttpRequest<any>, httpHander: HttpHandler): Observable<HttpEvent<any>> {
    return httpHander.handle(interceptedReq)
      .pipe(
        catchError(this.handleError.bind(this))
      );
  }

  handleError(error: HttpErrorResponse) {
    this.errorHandlerService.getSubjectOfErrors().next(error);
    return Observable.empty();
  }
}