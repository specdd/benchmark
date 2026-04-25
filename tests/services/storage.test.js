import { describe, test, expect, beforeEach } from '@jest/globals';
import { StorageService } from '../../src/services/storage.js';

describe('StorageService', () => {
    let storage;

    beforeEach(() => {
        localStorage.clear();
        storage = new StorageService();
    });

    test('load returns empty array when no data exists', () => {
        expect(storage.load()).toEqual([]);
    });

    test('round-trip: save then load returns the same list', () => {
        const todos = [
            { id: '1', title: 'buy milk', completed: false },
            { id: '2', title: 'walk dog', completed: true },
        ];
        storage.save(todos);
        expect(storage.load()).toEqual(todos);
    });

    test('load returns plain objects, not class instances', () => {
        storage.save([{ id: '1', title: 'test', completed: false }]);
        const [item] = storage.load();
        expect(item.constructor).toBe(Object);
    });

    test('save overwrites previous data', () => {
        storage.save([{ id: '1', title: 'old', completed: false }]);
        storage.save([{ id: '2', title: 'new', completed: false }]);
        expect(storage.load()).toHaveLength(1);
        expect(storage.load()[0].title).toBe('new');
    });
});
