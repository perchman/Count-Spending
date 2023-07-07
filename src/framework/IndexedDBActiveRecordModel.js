"use strict"

import IndexedDBConnection from "./IndexedDBConnection";

export default class IndexedDBActiveRecordModel{
    constructor(id) {
        this.id = id;
    }

    static getEntityName() {
        throw new Error("this method in not incremented");
    }

    static getStoreName() {
        return this.getEntityName() + 'Store';
    }

    static makeModel() {
        throw new Error("this method in not incremented");
    }

    static async getStore(mode) {
        mode = mode || 'readonly';

        const database = await IndexedDBConnection.getDatabase();
        const transaction = database.transaction(this.getStoreName(), mode);
        return transaction.store;
    }

    static async getAllRaw() {
        const store = await this.getStore();
        return await store.getAll();
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
        const store = await this.getStore('readwrite');

        let obj = await store.get(id);

        return this.makeModel(obj);
    }

    static async getCount() {
        const data = await this.getAllRaw()
        return data.length;
    }

    validate() {
        throw new Error("this method in not incremented");
    }

    toJSON() {
        throw new Error("this method in not incremented");
    }

    async save() {
        this.validate();

        const store = await this.constructor.getStore('readwrite');

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
        const store = await this.constructor.getStore('readwrite');
        store.delete(this.id);
    }
}