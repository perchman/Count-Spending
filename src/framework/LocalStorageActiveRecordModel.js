"use strict"

export default class LocalStorageActiveRecordModel {

    constructor(id) {
        if (typeof id !== "number") {
            throw new Error("Invalid data type for id. Type must be a number");
        }
        this.id = id;
    }

    static getEntityName() {
        throw new Error("this method in not incremented");
    }

    static makeModel() {
        throw new Error("this method in not incremented");
    }

    static getAllRaw() {
        return  JSON.parse(localStorage.getItem(this.getEntityName())) || {};
    }

    static getAll(orderBy) {
        const key = orderBy.split(' ')[0];
        const direction = orderBy.split(' ')[1];

        let data = this.getAllRaw() || {};

        let result = [];
        for (let key in data) {
            result.push(this.makeModel(data[key]))
        }
        result = this.sort(result, key, direction);
        return result;
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
                console.log(compare);
                if (compare(parseInt(data[a][key]), parseInt(data[next][key]))) {
                    let tmp  = data[a];
                    data[a] = data[next];
                    data[next] = tmp;
                }
            }
        }
        return data;
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