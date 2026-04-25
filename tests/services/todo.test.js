import { describe, test, expect, beforeEach, jest } from '@jest/globals';
import { TodoService } from '../../src/services/todo.js';

function makeStorage(initial = []) {
    let store = [...initial];
    return {
        load: jest.fn(() => store),
        save: jest.fn((todos) => { store = todos; }),
    };
}

describe('TodoService', () => {
    test('loads todos from storage on construction', () => {
        const storage = makeStorage([{ id: '1', title: 'existing', completed: false }]);
        const service = new TodoService(storage);
        expect(service.getAll()).toHaveLength(1);
        expect(service.getAll()[0].title).toBe('existing');
    });

    describe('add', () => {
        test('adds a todo and persists', () => {
            const storage = makeStorage();
            const service = new TodoService(storage);
            service.add('buy milk');
            expect(service.getAll()).toHaveLength(1);
            expect(service.getAll()[0].title).toBe('buy milk');
            expect(storage.save).toHaveBeenCalled();
        });

        test('rejects empty title', () => {
            const storage = makeStorage();
            const service = new TodoService(storage);
            service.add('');
            expect(service.getAll()).toHaveLength(0);
            expect(storage.save).not.toHaveBeenCalled();
        });

        test('rejects whitespace-only title', () => {
            const storage = makeStorage();
            const service = new TodoService(storage);
            service.add('   ');
            expect(service.getAll()).toHaveLength(0);
            expect(storage.save).not.toHaveBeenCalled();
        });

        test('trims title before storing', () => {
            const storage = makeStorage();
            const service = new TodoService(storage);
            service.add('  walk dog  ');
            expect(service.getAll()[0].title).toBe('walk dog');
        });
    });

    describe('remove', () => {
        test('removes the todo by id and persists', () => {
            const storage = makeStorage();
            const service = new TodoService(storage);
            service.add('task');
            const id = service.getAll()[0].id;
            storage.save.mockClear();
            service.remove(id);
            expect(service.getAll()).toHaveLength(0);
            expect(storage.save).toHaveBeenCalled();
        });
    });

    describe('toggle', () => {
        test('flips completed state and persists', () => {
            const storage = makeStorage();
            const service = new TodoService(storage);
            service.add('task');
            const id = service.getAll()[0].id;
            storage.save.mockClear();
            service.toggle(id);
            expect(service.getAll()[0].completed).toBe(true);
            expect(storage.save).toHaveBeenCalled();
            service.toggle(id);
            expect(service.getAll()[0].completed).toBe(false);
        });
    });

    describe('getFiltered', () => {
        let service;

        beforeEach(() => {
            service = new TodoService(makeStorage());
            service.add('active task');
            service.add('done task');
            service.toggle(service.getAll()[1].id);
        });

        test('all returns every todo', () => {
            expect(service.getFiltered('all')).toHaveLength(2);
        });

        test('active returns only incomplete todos', () => {
            const result = service.getFiltered('active');
            expect(result).toHaveLength(1);
            expect(result[0].completed).toBe(false);
        });

        test('completed returns only completed todos', () => {
            const result = service.getFiltered('completed');
            expect(result).toHaveLength(1);
            expect(result[0].completed).toBe(true);
        });
    });

    describe('clearCompleted', () => {
        test('removes all completed todos and persists', () => {
            const storage = makeStorage();
            const service = new TodoService(storage);
            service.add('keep');
            service.add('remove me');
            service.toggle(service.getAll()[1].id);
            storage.save.mockClear();
            service.clearCompleted();
            expect(service.getAll()).toHaveLength(1);
            expect(service.getAll()[0].title).toBe('keep');
            expect(storage.save).toHaveBeenCalled();
        });
    });
});
