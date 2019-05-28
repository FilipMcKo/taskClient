import { ConfirmComponent } from './components/confirm/confirm.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TaskService } from './task.service'

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddNewTaskComponent } from './components/add-new-task/add-new-task.component';
import { StartTaskComponent } from './components/start-task/start-task.component';
import { CancelTaskComponent } from './components/cancel-task/cancel-task.component';
import { RemoveTaskComponent } from './components/remove-task/remove-task.component';
import { ShowTasksComponent } from './components/show-tasks/show-tasks.component';
import {  MatButtonModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { SimpleModalModule } from 'ngx-simple-modal';
import { InfoPopupComponent } from './components/info-popup/info-popup.component';
import { RefreshProgressComponent } from './components/refresh-progress/refresh-progress.component';
import { InterceptorService } from './interceptor.service';



@NgModule({
  declarations: [
    AppComponent,
    AddNewTaskComponent,
    StartTaskComponent,
    CancelTaskComponent,
    RemoveTaskComponent,
    ShowTasksComponent,
    ConfirmComponent,
    InfoPopupComponent,
    RefreshProgressComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    Ng2OrderModule,
    MatButtonModule,
    BrowserAnimationsModule,
    CommonModule,
    BrowserModule,
    SimpleModalModule
  ],
  providers: [TaskService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  entryComponents: [ConfirmComponent, InfoPopupComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
