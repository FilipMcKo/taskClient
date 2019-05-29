import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private subjectOfErrors: Subject<HttpErrorResponse> = new Subject();
  
  getObservableOfErrors() {
    return this.subjectOfErrors.asObservable();
  }

  getSubjectOfErrors(){
    return this.subjectOfErrors;
  }
}
