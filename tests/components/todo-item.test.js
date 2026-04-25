import { describe, test, expect, jest } from '@jest/globals';
import { TodoItem } from '../../src/components/todo-item.js';

function makeTodo(overrides = {}) {
    return { id: 'abc-123', title: 'buy milk', completed: false, ...overrides };
}

describe('TodoItem', () => {
    test('displays the todo title', () => {
        const el = new TodoItem(makeTodo(), jest.fn(), jest.fn()).render();
        expect(el.querySelector('span').textContent).toBe('buy milk');
    });

    test('checkbox reflects completed = false', () => {
        const el = new TodoItem(makeTodo({ completed: false }), jest.fn(), jest.fn()).render();
        expect(el.querySelector('input[type="checkbox"]').checked).toBe(false);
    });

    test('checkbox reflects completed = true', () => {
        const el = new TodoItem(makeTodo({ completed: true }), jest.fn(), jest.fn()).render();
        expect(el.querySelector('input[type="checkbox"]').checked).toBe(true);
    });

    test('applies strikethrough style when completed', () => {
        const el = new TodoItem(makeTodo({ completed: true }), jest.fn(), jest.fn()).render();
        expect(el.querySelector('span').style.textDecoration).toBe('line-through');
    });

    test('no strikethrough when not completed', () => {
        const el = new TodoItem(makeTodo({ completed: false }), jest.fn(), jest.fn()).render();
        expect(el.querySelector('span').style.textDecoration).toBe('');
    });

    test('onToggle is called with the todo id when checkbox changes', () => {
        const onToggle = jest.fn();
        const el = new TodoItem(makeTodo(), onToggle, jest.fn()).render();
        el.querySelector('input[type="checkbox"]').dispatchEvent(new Event('change'));
        expect(onToggle).toHaveBeenCalledWith('abc-123');
    });

    test('onRemove is called with the todo id when remove button is clicked', () => {
        const onRemove = jest.fn();
        const el = new TodoItem(makeTodo(), jest.fn(), onRemove).render();
        el.querySelector('button').click();
        expect(onRemove).toHaveBeenCalledWith('abc-123');
    });

    test('does not modify the todo object', () => {
        const todo = makeTodo();
        const original = { ...todo };
        new TodoItem(todo, jest.fn(), jest.fn()).render();
        expect(todo).toEqual(original);
    });
});
