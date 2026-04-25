class TodoItem {
    constructor(todo, onToggle, onRemove) {
        this._todo = todo;
        this._onToggle = onToggle;
        this._onRemove = onRemove;
    }

    render() {
        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = this._todo.completed;
        checkbox.addEventListener('change', () => this._onToggle(this._todo.id));

        const title = document.createElement('span');
        title.textContent = this._todo.title;
        if (this._todo.completed) {
            title.style.textDecoration = 'line-through';
        }

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => this._onRemove(this._todo.id));

        li.appendChild(checkbox);
        li.appendChild(title);
        li.appendChild(removeBtn);

        return li;
    }
}

export { TodoItem };
