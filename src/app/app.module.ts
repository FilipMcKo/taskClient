import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TaskService } from './task.service'

import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { FormsModule } from '@angular/forms';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddNewTaskComponent } from './add-new-task/add-new-task.component';
import { StartTaskComponent } from './start-task/start-task.component';
import { CancelTaskComponent } from './cancel-task/cancel-task.component';
import { RemoveTaskComponent } from './remove-task/remove-task.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    AddNewTaskComponent,
    StartTaskComponent,
    CancelTaskComponent,
    RemoveTaskComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    Ng2OrderModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
