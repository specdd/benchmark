import { describe, test, expect, jest } from '@jest/globals';
import { App } from '../../src/components/app.js';

function makeService(todos = []) {
    const store = [...todos];
    return {
        add: jest.fn((title) => store.push({ id: String(store.length + 1), title, completed: false })),
        remove: jest.fn((id) => { const i = store.findIndex(t => t.id === id); if (i !== -1) store.splice(i, 1); }),
        toggle: jest.fn((id) => { const t = store.find(t => t.id === id); if (t) t.completed = !t.completed; }),
        getAll: jest.fn(() => store),
        getFiltered: jest.fn((filter) => {
            if (filter === 'active') return store.filter(t => !t.completed);
            if (filter === 'completed') return store.filter(t => t.completed);
            return store;
        }),
        clearCompleted: jest.fn(),
    };
}

function mount(service) {
    const root = document.createElement('div');
    new App(root, service).mount();
    return root;
}

describe('App', () => {
    test('renders form, filter controls, and list on mount', () => {
        const root = mount(makeService());
        expect(root.querySelector('form')).not.toBeNull();
        expect(root.querySelector('nav')).not.toBeNull();
        expect(root.querySelector('ul')).not.toBeNull();
    });

    test('renders a filter button for each filter', () => {
        const root = mount(makeService());
        const buttons = root.querySelectorAll('nav button');
        const labels = Array.from(buttons).map(b => b.dataset.filter);
        expect(labels).toEqual(['all', 'active', 'completed']);
    });

    test('displays all todos on initial render', () => {
        const service = makeService([
            { id: '1', title: 'a', completed: false },
            { id: '2', title: 'b', completed: true },
        ]);
        const root = mount(service);
        expect(root.querySelectorAll('ul li:not([data-empty])')).toHaveLength(2);
    });

    test('filter change updates the displayed list', () => {
        const service = makeService([
            { id: '1', title: 'active task', completed: false },
            { id: '2', title: 'done task', completed: true },
        ]);
        const root = mount(service);
        root.querySelector('nav button[data-filter="active"]').click();
        expect(root.querySelectorAll('ul li:not([data-empty])')).toHaveLength(1);
        expect(root.querySelector('ul li span').textContent).toBe('active task');
    });

    test('adding a todo re-renders the list', () => {
        const service = makeService();
        const root = mount(service);
        const input = root.querySelector('input[type="text"]');
        input.value = 'new task';
        root.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true }));
        expect(root.querySelectorAll('ul li:not([data-empty])')).toHaveLength(1);
    });

    test('toggling a todo re-renders the list', () => {
        const service = makeService([{ id: '1', title: 'task', completed: false }]);
        const root = mount(service);
        root.querySelector('nav button[data-filter="active"]').click();
        root.querySelector('ul input[type="checkbox"]').dispatchEvent(new Event('change'));
        expect(root.querySelectorAll('ul li:not([data-empty])')).toHaveLength(0);
    });

    test('removing a todo re-renders the list', () => {
        const service = makeService([{ id: '1', title: 'task', completed: false }]);
        const root = mount(service);
        root.querySelector('ul button').click();
        expect(root.querySelector('ul li[data-empty]')).not.toBeNull();
    });
});
