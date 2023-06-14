"use strict"

export default class Cost {

    constructor(id, date, price, description) {
        this.id = id;
        this.date = date;
        this.price = price;
        this.description = description;
    }

    static getAllRaw() {
        let costs = JSON.parse(localStorage.getItem('cost')) || {};

        for (let cost in costs) {
            costs[cost] = new Cost(
                costs[cost].id,
                costs[cost].date,
                costs[cost].price,
                costs[cost].description
            );
        }

        return costs;
    }

    static getAllAsArray() {
        return Object.values(this.getAllRaw()) || [];
    }

    static getCostId() {
        return parseInt(localStorage.getItem('costId')) || 1;
    }

    static getById(id) {
        return this.getAllRaw()[id];
    }

    static saveId(id) {
        localStorage.setItem(`costId`, JSON.stringify(id + 1));
    }

    static create(date, price, description) {
        const id = this.getCostId();
        this.saveId(id);

        return new Cost(id, date, price, description);
    }

    save() {
        let costs = this.constructor.getAllRaw();
        costs[this.id] = {
            id: this.id,
            date: new Date(this.date).getTime(),
            price: this.price,
            description: this.description
        }

        localStorage.setItem('cost', JSON.stringify(costs));
    }

    delete() {
        let costs = this.constructor.getAllRaw();
        delete costs[this.id];

        localStorage.setItem('cost', JSON.stringify(costs));
    }

    changeDate(date) {
        this.date = date;
    }

    changePrice(price) {
        this.price = price;
    }

    changeDescription(description) {
        this.description = description;
    }
}