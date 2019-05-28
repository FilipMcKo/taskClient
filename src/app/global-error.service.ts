import { Injectable, ErrorHandler } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorService 
//implements ErrorHandler 
{

  // subjectOfErrors: Subject<any> = new Subject();
  // observableOfErrors: Observable<any> = new Observable();

  // getObservableOfErrors() {
  //   console.log('getObservableOfErrors from GlobalErrorService was called');
  //   return this.subjectOfErrors.asObservable();
  //   //return this.observableOfErrors;
  // }

  // handleError(error: any): void{
  //   //console.log('error caught in GlobalErrorService: ' + JSON.stringify(error.error));
  //   this.subjectOfErrors.error(error);
  //   //this.observableOfErrors.concat(error);
  
  // }
}
