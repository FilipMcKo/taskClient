export class TaskCreationRequest {

    private name: string;
    private description: string;

    resetValues() {
        this.name = null;
        this.description = null;
    }
}