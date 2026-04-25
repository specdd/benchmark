import { describe, test, expect } from '@jest/globals';
import { Todo } from '../../src/models/todo.js';

describe('Todo', () => {
    test('has id, title, and completed fields', () => {
        const todo = new Todo('buy milk');
        expect(typeof todo.id).toBe('string');
        expect(todo.id.length).toBeGreaterThan(0);
        expect(todo.title).toBe('buy milk');
        expect(todo.completed).toBe(false);
    });

    test('generates a unique id per instance', () => {
        const a = new Todo('a');
        const b = new Todo('b');
        expect(a.id).not.toBe(b.id);
    });

    test('toggle: false → true', () => {
        const todo = new Todo('test');
        todo.toggle();
        expect(todo.completed).toBe(true);
    });

    test('toggle: true → false', () => {
        const todo = new Todo('test');
        todo.toggle();
        todo.toggle();
        expect(todo.completed).toBe(false);
    });
});
