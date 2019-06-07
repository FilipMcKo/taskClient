export class TaskCreationRequest {

    name: string;
    description: string;

    resetValues() {
        this.name = null;
        this.description = null;
    }
}