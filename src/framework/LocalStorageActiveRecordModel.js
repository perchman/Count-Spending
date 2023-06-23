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
        return  JSON.parse(localStorage.getItem(this.getEntityName())) || [];
    }

    static getAll(orderBy) {
        const key = orderBy.split(' ')[0];
        const direction = orderBy.split(' ')[1];

        let data = this.getAllRaw();
        data = this.sort(data, key, direction);

        return data.map((item) => {
            return this.makeModel(item)
        });
    }

    static getPart(orderBy, limit) {
        return this.getAll(orderBy).slice(limit.start, limit.end);
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

    static getIndex(data, id) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                return i;
            }
        }
        return null;
    }

    static getNextId() {
        let id = parseInt(localStorage.getItem(`${this.getEntityName()}Id`)) || 0;
        id += 1;

        localStorage.setItem(`${this.getEntityName()}Id`, JSON.stringify(id));

        return id;
    }

    static getById(id) {
        const data = this.getAllRaw();
        const index = this.getIndex(data, id);

        return this.makeModel(data[index]);
    }

    static getCount() {
        return this.getAllRaw().length;
    }

    toJSON() {
        throw new Error("this method in not incremented");
    }

    save() {
        let data = this.constructor.getAllRaw();
        data.push(this.toJSON());

        localStorage.setItem(this.constructor.getEntityName(), JSON.stringify(data));
    }

    update() {
        let data = this.constructor.getAllRaw();
        const index = this.constructor.getIndex(data, this.id);
        data[index] = this.toJSON();

        localStorage.setItem(this.constructor.getEntityName(), JSON.stringify(data));
    }

    delete() {
        let data = this.constructor.getAllRaw();
        const index = this.constructor.getIndex(data, this.id);
        data.splice(index, 1);

        localStorage.setItem(this.constructor.getEntityName(), JSON.stringify(data));
    }
}