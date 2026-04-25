export class Todo {
    constructor(title) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.completed = false;
    }

    toggle() {
        this.completed = !this.completed;
    }
}

