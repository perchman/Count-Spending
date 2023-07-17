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

    static createTransaction() {
        throw new Error("This method in not implemented");
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

        let cursor = direction === 'desc' ?
            await index.openCursor(null, 'prev') :
            await index.openCursor();

        let result = [];
        let count = 0;

        while (cursor) {
            if (count >= limit.start && count < limit.end) {
                result.push(this.makeModel(cursor.value));
            }
            count++;
            cursor = await cursor.continue();
        }

        return result;
    }

    static async getById(id) {
        const database = await this.getDatabase();
        const transaction = database.transaction(this.getStoreName());
        const store = transaction.store;

        return this.makeModel(await store.get(id));
    }

    static async getCount() {
        const database = await this.getDatabase();
        const transaction = database.transaction(this.getStoreName());
        const store = transaction.store;

        return await store.count();
    }

    validate() {
        throw new Error("this method in not implemented");
    }

    toJSON() {
        throw new Error("this method in not implemented");
    }

    async save() {
        this.validate();

        const database = this.constructor.getDatabase();
        const transaction = database.transaction(this.constructor.getStoreName, 'readwrite');
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

    async beginTransaction(storeNames) {
        const database = await this.constructor.getDatabase();
        const transaction = database.transaction(storeNames, 'readwrite');

        return transaction;
    }

    async delete() {
        const database = await this.constructor.getDatabase();
        const transaction = database.transaction(this.constructor.getStoreName(), 'readwrite');
        const store = transaction.store;

        store.delete(this.id);
    }
}