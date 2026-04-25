import { describe, test, expect, jest } from '@jest/globals';
import { TodoList } from '../../src/components/todo-list.js';

function makeTodo(id, title, completed = false) {
    return { id, title, completed };
}

describe('TodoList', () => {
    test('renders one item per todo', () => {
        const list = new TodoList(jest.fn(), jest.fn());
        const el = list.render([makeTodo('1', 'first'), makeTodo('2', 'second')]);
        expect(el.querySelectorAll('li')).toHaveLength(2);
    });

    test('shows empty state when todos array is empty', () => {
        const list = new TodoList(jest.fn(), jest.fn());
        const el = list.render([]);
        const items = el.querySelectorAll('li');
        expect(items).toHaveLength(1);
        expect(items[0].dataset.empty).toBe('true');
    });

    test('re-render replaces previous items', () => {
        const list = new TodoList(jest.fn(), jest.fn());
        list.render([makeTodo('1', 'first')]);
        const el = list.render([makeTodo('2', 'second'), makeTodo('3', 'third')]);
        expect(el.querySelectorAll('li')).toHaveLength(2);
    });

    test('propagates onToggle to each item', () => {
        const onToggle = jest.fn();
        const list = new TodoList(onToggle, jest.fn());
        const el = list.render([makeTodo('1', 'task')]);
        el.querySelector('input[type="checkbox"]').dispatchEvent(new Event('change'));
        expect(onToggle).toHaveBeenCalledWith('1');
    });

    test('propagates onRemove to each item', () => {
        const onRemove = jest.fn();
        const list = new TodoList(jest.fn(), onRemove);
        const el = list.render([makeTodo('1', 'task')]);
        el.querySelector('button').click();
        expect(onRemove).toHaveBeenCalledWith('1');
    });
});
