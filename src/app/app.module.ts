import { DataSharingService } from './datasharing.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {TaskService} from './task.service'

import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [TaskService, DataSharingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
