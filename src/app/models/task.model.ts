import { Component, setTestabilityGetter } from '@angular/core';

// @Component({
//   selector: 'task-model',
//   templateUrl: './task.model.html'
// })
export class Task {
    id: number;
    name: string;
    description: string;
    currentState: string;
    progressPercentage: number;
    taskCantBeStarted: boolean;

    deserialize(input:any):this{
      Object.assign(this, input);
      return this;
    }
    delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
    }

     cantBeStarted(currentState: string, taskid: number):boolean{
      //await this.delay(300);
      //console.log('start', taskid);
      return !(currentState === "NEW");
    }

    cantBeCancelled(currentState: string):boolean{
      return !(currentState === "RUNNING");
    }
  }