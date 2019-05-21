export class Task {
  id: number;
  name: string;
  description: string;
  currentState: string;
  progressPercentage: number;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

  assignValuesOf(input: Task){
    this.id = input.id;
    this.name = input.name;
    this.description = input.description;
    this.currentState = input.currentState;
    this.progressPercentage = input.progressPercentage;
  }
}