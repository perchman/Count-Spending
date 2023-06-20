"use strict"

import LocalStorageActiveRecordModel from "../framework/LocalStorageActiveRecordModel";
import Balance from "../model/Balance";
import Category from "./Category";

export default class Cost extends LocalStorageActiveRecordModel{

    constructor(id, date, price, description, category) {
        super(id);
        if (typeof date !== "string") {
            throw new Error("Invalid data type for date. Type must be a string");
        }
        if (typeof price !== "number") {
            throw new Error("Invalid data type for price. Type must be a number");
        }
        if (typeof description !== "string") {
            throw new Error("Invalid data type for description. Type must be a string");
        }
        if (typeof category !== "object") {
            throw new Error("Invalid data type for category. Type must be a object");
        }
        this.date = date;
        this.price = price;
        this.description = description;
        this.category = category;
    }

    static getEntityName() {
        return 'cost';
    }

    static makeModel(data) {
        return new Cost(
            data.id,
            data.date,
            data.price,
            data.description,
            data.category
        );
    }

    static create(date, price, description, category) {
        const id = this.getNextId();
        const cost = new Cost(
            id,
            date,
            price,
            description,
            category
        )
        const balance = new Balance();

        balance.decrease(cost);
        cost.save();

        return cost;
    }

    toJSON() {
        return {
            id: this.id,
            date: new Date(this.date).getTime(),
            price: this.price,
            description: this.description,
            categoryId: this.category.id,
        };
    }

    changeDate(date) {
        this.date = date;
    }

    changeCategory(category) {
        this.category = category;
    }

    changePrice(price) {
        this.price = price;
    }

    changeDescription(description) {
        this.description = description;
    }

    getCategory() {
        return Category.getById(this.category.id);
    }

    getCategoryName() {
        return this.getCategory().name;
    }
}