export class TaskCreationRequest {

    name: string;
    description: string;
    customDuration: number;

    resetValues() {
        this.name = null;
        this.description = null;
        this.customDuration = null;
    }
}