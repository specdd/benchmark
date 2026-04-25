import { TodoService } from '../services/todo.js';
import { TodoForm } from './todo-form.js';
import { TodoList } from './todo-list.js';

const FILTERS = ['all', 'active', 'completed'];

export class App {
    constructor(mountEl, service = new TodoService()) {
        this._mountEl = mountEl;
        this._service = service;
        this._filter = 'all';

        this._list = new TodoList(
            (id) => { this._service.toggle(id); this._renderList(); },
            (id) => { this._service.remove(id); this._renderList(); }
        );

        this._form = new TodoForm((title) => {
            this._service.add(title);
            this._renderList();
        });
    }

    mount() {
        this._mountEl.appendChild(this._form.render());
        this._mountEl.appendChild(this._buildFilterControls());
        this._mountEl.appendChild(this._list.render(this._service.getFiltered(this._filter)));
        this._renderList();
    }

    _buildFilterControls() {
        this._nav = document.createElement('nav');
        FILTERS.forEach(f => {
            const btn = document.createElement('button');
            btn.textContent = f;
            btn.dataset.filter = f;
            btn.addEventListener('click', () => {
                this._filter = f;
                this._renderList();
            });
            this._nav.appendChild(btn);
        });
        return this._nav;
    }

    _renderList() {
        this._nav.querySelectorAll('button').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === this._filter);
        });
        this._list.render(this._service.getFiltered(this._filter));
    }
}
