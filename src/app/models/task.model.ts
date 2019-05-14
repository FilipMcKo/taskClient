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

    cantBeStarted():boolean{
      this.taskCantBeStarted = !(this.currentState === "NEW");
      return this.taskCantBeStarted;
    }

    cantBeCancelled():boolean{
      return !(this.currentState === "RUNNING");
    }
  }