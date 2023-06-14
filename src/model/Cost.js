"use strict"

import LocalStorageActiveRecordModel from "../framework/LocalStorageActiveRecordModel";

export default class Cost extends LocalStorageActiveRecordModel{

    constructor(id, date, price, description) {
        super(id);
        this.date = date;
        this.price = price;
        this.description = description;
    }

    static getEntityName() {
        return 'cost';
    }

    static makeModel(data) {
        return new Cost(
            data.id,
            data.date,
            data.price,
            data.description
        );
    }

    static create(date, price, description) {
        const id = this.getNextId();

        return new Cost(id, date, price, description);
    }

    toJSON() {
        return {
            id: this.id,
            date: new Date(this.date).getTime(),
            price: this.price,
            description: this.description
        };
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