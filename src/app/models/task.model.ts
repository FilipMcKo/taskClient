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
}