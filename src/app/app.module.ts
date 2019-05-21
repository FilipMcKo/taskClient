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

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    AddNewTaskComponent
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
