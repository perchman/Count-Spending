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

    static async getAllRaw() {
        return JSON.parse(localStorage.getItem(this.getEntityName())) || [];
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

    static getIndex(data, id) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === id) {
                return i;
            }
        }
        return null;
    }

    static async getNextId() {
        let id = parseInt(localStorage.getItem(`${this.getEntityName()}Id`)) || 0;
        id += 1;

        localStorage.setItem(`${this.getEntityName()}Id`, JSON.stringify(id));

        return id;
    }

    static async getById(id) {
        const data = await this.getAllRaw();
        const index = this.getIndex(data, id);

        return this.makeModel(data[index]);
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
        let data = await this.constructor.getAllRaw();

        if (!this.id) {
            this.id = await this.constructor.getNextId();
            data.push(this.toJSON());
        } else {
            const index = this.constructor.getIndex(data, this.id);
            if (index === null) {
                throw new Error("Entity not exist");
            }
            data[index] = this.toJSON()
        }

        localStorage.setItem(this.constructor.getEntityName(), JSON.stringify(data));
    }

    async delete() {
        let data = await this.constructor.getAllRaw();
        const index = this.constructor.getIndex(data, this.id);
        data.splice(index, 1);

        localStorage.setItem(this.constructor.getEntityName(), JSON.stringify(data));
    }
}