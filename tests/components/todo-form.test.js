import { describe, test, expect, jest } from '@jest/globals';
import { TodoForm } from '../../src/components/todo-form.js';

function submit(el) {
    el.dispatchEvent(new Event('submit', { bubbles: true }));
}

describe('TodoForm', () => {
    test('renders a text input and a submit button', () => {
        const el = new TodoForm(jest.fn()).render();
        expect(el.querySelector('input[type="text"]')).not.toBeNull();
        expect(el.querySelector('button[type="submit"]')).not.toBeNull();
    });

    test('calls onAdd with trimmed title on valid submit', () => {
        const onAdd = jest.fn();
        const form = new TodoForm(onAdd);
        const el = form.render();
        el.querySelector('input').value = '  buy milk  ';
        submit(el);
        expect(onAdd).toHaveBeenCalledWith('buy milk');
    });

    test('clears input after valid submit', () => {
        const form = new TodoForm(jest.fn());
        const el = form.render();
        const input = el.querySelector('input');
        input.value = 'buy milk';
        submit(el);
        expect(input.value).toBe('');
    });

    test('does not call onAdd when input is empty', () => {
        const onAdd = jest.fn();
        const form = new TodoForm(onAdd);
        const el = form.render();
        el.querySelector('input').value = '';
        submit(el);
        expect(onAdd).not.toHaveBeenCalled();
    });

    test('does not call onAdd when input is whitespace only', () => {
        const onAdd = jest.fn();
        const form = new TodoForm(onAdd);
        const el = form.render();
        el.querySelector('input').value = '   ';
        submit(el);
        expect(onAdd).not.toHaveBeenCalled();
    });
});
