"use strict"

export default class LocalStorageActiveRecordModel {

    constructor(id) {
        this.id = id;
    }

    static getEntityName() {
        throw new Error("this method in not incremented");
    }

    static makeModel() {
        throw new Error("this method in not incremented");
    }

    static getAllRaw() {
        return JSON.parse(localStorage.getItem(this.getEntityName())) || {};
    }

    static getAllAsArray() {
        return Object.values(this.getAllRaw(this.getEntityName())) || [];
    }

    static getNextId() {
        let id = parseInt(localStorage.getItem(`${this.getEntityName()}Id`)) || 0;
        id += 1;

        localStorage.setItem(`${this.getEntityName()}Id`, JSON.stringify(id));

        return id;
    }

    static getById(id) {
        const data = this.getAllRaw(this.getEntityName())[id];
        return this.makeModel(data);
    }

    toJSON() {
        throw new Error("this method in not incremented");
    }

    save() {
        let data = this.constructor.getAllRaw();
        data[this.id] = this.toJSON();

        localStorage.setItem(this.constructor.getEntityName(), JSON.stringify(data));
    }

    delete() {
        let data = this.constructor.getAllRaw();
        delete data[this.id];

        localStorage.setItem(this.constructor.getEntityName(), JSON.stringify(data));
    }
}