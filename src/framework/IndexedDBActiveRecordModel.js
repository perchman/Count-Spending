"use strict"

import ServiceLocator from "./ServiceLocator";
import DefaultIndexedDB from "../DefaultIndexedDB";

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

    static async getDatabase() {
        return await ServiceLocator.get(this.getDatabaseName());
    }

    static makeModel() {
        throw new Error("This method in not implemented");
    }

    static createTransaction() {
        throw new Error("This method in not implemented");
    }

    static async getAllRaw() {
        const db = await this.getDatabase();
        const table = db[this.getEntityName()];

        return await table.toArray();
    }

    static async getAll() {
        let data = await this.getAllRaw();

        return data.map((item) => {
            return this.makeModel(item)
        });
    }

    static async getPart(orderBy, limit) {
        const [key, direction] = orderBy.split(' ');
        const db = await this.getDatabase();

        let data = await db[this.getEntityName()].orderBy(key);

        if (direction === 'desc') {
            data = data.reverse();
        }

        let result = [];

        await data.offset(limit.start)
                  .limit(limit.end)
                  .each((elem) => {
                      result.push(this.makeModel(elem));
                  });

        return result;
    }

    static async getById(id) {
        const db = await this.getDatabase();
        const obj = await db[this.getEntityName()].get(id);

        return this.makeModel(obj);
    }

    static async getCount() {
        const db = await this.getDatabase();
        const table = db[this.getEntityName()];

        return await table.count();
    }

    validate() {
        throw new Error("this method in not implemented");
    }

    toJSON() {
        throw new Error("this method in not implemented");
    }

    async save() {
        this.validate();

        const db = await this.constructor.getDatabase();
        const table = db[this.constructor.getEntityName()];

        await table.put(this.toJSON());
    }

    async delete() {
        const db = await this.constructor.getDatabase();
        const table = db[this.constructor.getEntityName()];

        table.delete(this.id);
    }
}