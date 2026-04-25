const STORAGE_KEY = 'todos';

class StorageService {
    load() {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    }

    save(todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
}

export {StorageService};
