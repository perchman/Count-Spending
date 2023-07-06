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

    static async getAllRaw() {
      const store = await IndexedDBConnection.getStore(this.getStoreName());
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

    static async getNextId() {
        const store = await IndexedDBConnection.getStore(`${this.getEntityName()}Id`);
        let id = parseInt(await store.getAll()) || 0;
        id += 1;

        store.put(id, 'id');

        return id;
    }

    static async getById(id) {
        const store = await IndexedDBConnection.getStore(this.getStoreName());
        const obj = await store.get(id);
        console.log(obj);
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

        if (!this.id) {
            this.id = await this.constructor.getNextId();
            const store = await IndexedDBConnection.getStore(this.constructor.getStoreName());
            store.add(this.toJSON());
        } else {
            const store = await IndexedDBConnection.getStore(this.constructor.getStoreName());
            store.put(this.toJSON());
        }
    }

    async delete() {
        const store = await IndexedDBConnection.getStore(this.constructor.getStoreName());
        store.delete(this.id);
    }
}