"use strict"

import DefaultIndexedDB from "../DefaultIndexedDB";
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
        return await transaction.store.getAll();
    }

    static async getAll(orderBy) {
        const key = orderBy.split(' ')[0];
        const direction = orderBy.split(' ')[1];

        let data = await this.getAllRaw();

        data = this.sort(data, key, direction);
        return data.map((item) => {
            return this.makeModel(item)
        });
    }

    static async getPart(orderBy, limit) {
        const data = await this.getAll(orderBy);
        return data.slice(limit.start, limit.end);
    }

    static sort(data, key, direction) {
        for (let i = data.length - 1; i > 0; i--) {
            for (let a = 0; a < i; a++) {
                let compare;
                let next = a + 1;

                if (direction === 'asc') {
                    compare = (a, b) => a > b;
                } else if (direction === 'desc') {
                    compare = (a, b) => a < b;
                } else {
                    throw new Error('Invalid sort directory');
                }
                if (compare(parseInt(data[a][key]), parseInt(data[next][key]))) {
                    let tmp  = data[a];
                    data[a] = data[next];
                    data[next] = tmp;
                }
            }
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