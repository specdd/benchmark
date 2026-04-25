import { TodoItem } from './todo-item.js';

export class TodoList {
    constructor(onToggle, onRemove) {
        this._onToggle = onToggle;
        this._onRemove = onRemove;
        this._el = document.createElement('ul');
    }

    render(todos) {
        this._el.innerHTML = '';

        if (!todos.length) {
            const empty = document.createElement('li');
            empty.dataset.empty = 'true';
            empty.textContent = 'No todos yet.';
            this._el.appendChild(empty);
            return this._el;
        }

        todos.forEach(todo => {
            this._el.appendChild(new TodoItem(todo, this._onToggle, this._onRemove).render());
        });

        return this._el;
    }
}
