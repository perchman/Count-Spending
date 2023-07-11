"use strict"

import ServiceLocator from "./ServiceLocator";

export default class IndexedDBActiveRecordModel {
    constructor(id) {
        this.id = id;
    }

    static getEntityName() {
        throw new Error("This method in not implemented");
    }

    static getDatabaseName() {
        throw new Error("This method in not implemented");
    }

    static getStoreName() {
        return this.getEntityName() + 'Store';
    }

    static makeModel() {
        throw new Error("This method in not implemented");
    }

    static async getDatabase() {
        return await ServiceLocator.get(this.getDatabaseName());
    }

    static async getAllRaw() {
        const database = await this.getDatabase();
        const transaction = database.transaction(this.getStoreName());
        const store = transaction.store;

        return await store.getAll();
    }

    static async getAll() {
        let data = await this.getAllRaw();

        return data.map((item) => {
            return this.makeModel(item)
        });
    }

    static async getPart(orderBy, limit) {
        const [key, direction] = orderBy.split(' ');

        const database = await this.getDatabase();
        const transaction = database.transaction(this.getStoreName());
        const store = transaction.store;

        const index = store.index(key + 'Index');

        let request;
        if (direction === 'desc') {
            request = index.openCursor(null, 'prev');
        } else {
            request = index.openCursor();
        }

        return await this.dataCompilation(request, limit);
    }

    static async dataCompilation(request, limit) {
        let data = [];
        let count = 0;

        let cursor = await request;
        while (cursor) {
            if (count >= limit.start && count < limit.end) {
                data.push(this.makeModel(cursor.value));
            }
            count++;
            cursor = await cursor.continue();
        }

        return data;
    }

    static async getById(id) {
        const database = await this.getDatabase();
        const transaction = database.transaction(this.getStoreName(), 'readwrite');
        const store = transaction.store;

        return this.makeModel(await store.get(id));
    }

    static async getCount() {
        const data = await this.getAllRaw()
        return data.length;
    }

    validate() {
        throw new Error("this method in not implemented");
    }

    toJSON() {
        throw new Error("this method in not implemented");
    }

    async save() {
        this.validate();

        const database = await this.constructor.getDatabase();
        const transaction = database.transaction(this.constructor.getStoreName(), 'readwrite');
        const store = transaction.store;

        if (!this.id) {
            const obj = this.toJSON();
            const key = await store.add(obj);

            obj.id = key;
            store.put(obj, key);
        } else {
            store.put(this.toJSON(), this.id);
        }
    }

    async delete() {
        const database = await this.constructor.getDatabase();
        const transaction = database.transaction(this.constructor.getStoreName(), 'readwrite');
        const store = transaction.store;

        store.delete(this.id);
    }
}