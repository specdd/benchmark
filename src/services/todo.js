import { Todo } from '../models/todo.js';
import { StorageService } from './storage.js';

export class TodoService {
    constructor(storage = new StorageService()) {
        this._storage = storage;
        this._todos = this._storage.load().map(d => Object.assign(new Todo(d.title), d));
    }

    add(title) {
        if (!title || !title.trim()) return;
        const todo = new Todo(title.trim());
        this._todos.push(todo);
        this._persist();
    }

    remove(id) {
        this._todos = this._todos.filter(t => t.id !== id);
        this._persist();
    }

    toggle(id) {
        const todo = this._todos.find(t => t.id === id);
        if (todo) {
            todo.toggle();
            this._persist();
        }
    }

    getAll() {
        return this._todos;
    }

    getFiltered(filter) {
        if (filter === 'active') return this._todos.filter(t => !t.completed);
        if (filter === 'completed') return this._todos.filter(t => t.completed);
        return this._todos;
    }

    clearCompleted() {
        this._todos = this._todos.filter(t => !t.completed);
        this._persist();
    }

    _persist() {
        this._storage.save(this._todos);
    }
}
