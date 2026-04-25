class TodoForm {
    constructor(onAdd) {
        this._onAdd = onAdd;
        this._el = document.createElement('form');
        this._input = document.createElement('input');
        this._input.type = 'text';
        this._input.placeholder = 'What needs to be done?';

        const button = document.createElement('button');
        button.type = 'submit';
        button.textContent = 'Add';

        this._el.appendChild(this._input);
        this._el.appendChild(button);
        this._el.addEventListener('submit', (e) => {
            e.preventDefault();
            this._submit();
        });
    }

    render() {
        return this._el;
    }

    _submit() {
        const title = this._input.value.trim();
        if (!title) {
            this._input.focus();
            return;
        }
        this._onAdd(title);
        this._input.value = '';
    }
}

export { TodoForm };
