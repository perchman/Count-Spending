"use strict"

export default class Cost {

    constructor(id, date, price, description) {
        this.id = id;
        this.date = date;
        this.price = price;
        this.description = description;
    }

    static getCosts() {
        return JSON.parse(localStorage.getItem('cost')) || {};
    }

    static getCostsArray() {
        return Object.values(this.getCosts()) || [];
    }

    static getCostId() {
        return parseInt(localStorage.getItem('costId')) || 1;
    }

    static getById(id) {
        const data = this.getCosts()[id];

        return new Cost(
            id,
            new Date(data.date),
            data.price,
            data.description
        );
    }

    static saveId(id) {
        localStorage.setItem(`costId`, JSON.stringify(id + 1));
    }

    static create(date, price, description) {
        const id = this.getCostId();
        this.saveId(id);

        return new Cost(id, date, price, description);
    }

    save(costs) {
        costs = costs || null;

        if (!costs) {
            costs = Cost.getCosts();
            costs[this.id] = {
                id: this.id,
                date: new Date(this.date).getTime(),
                price: this.price,
                description: this.description,
            };
        }

        localStorage.setItem('cost', JSON.stringify(costs));
    }

    delete() {
        let costs = Cost.getCosts();
        delete costs[this.id];

        this.save(costs);
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