"use strict"

import LocalStorageActiveRecordModel from "../framework/LocalStorageActiveRecordModel";
import Balance from "../model/Balance";
import Category from "./Category";

export default class Cost extends LocalStorageActiveRecordModel{

    constructor(id, date, price, description, category) {
        super(id);
        this.validateDate(date);
        this.validatePrice(price);
        this.validateDescription(description);
        this.validateCategory(category);

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
            new Date(data.date),
            data.price,
            data.description,
            Category.getById(data.categoryId)
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

        balance.decrease(cost.price);
        cost.save();

        return cost;
    }

    static existsCostsHasCategory(categoryId) {
        const costs = Cost.getAllRaw();
        for (let cost in costs) {
            if (costs[cost].categoryId === categoryId) {
                return true;
            }
        }
        return false;
    }

    validateDate(date) {
        if (typeof date !== "object") {
            throw new Error("Invalid data type for date. Type must be a object");
        }
        if (!date instanceof Date) {
            throw new Error("Invalid data type for date. Object must be an instance of the Date object");
        }
    }

    validatePrice(price) {
        if (typeof price !== "number") {
            throw new Error("Invalid data type for price. Type must be a number");
        }
    }

    validateDescription(description) {
        if (typeof description !== "string") {
            throw new Error("Invalid data type for description. Type must be a string");
        }
    }

    validateCategory(category) {
        if (typeof category !== "object") {
            throw new Error("Invalid data type for category. Type must be a object");
        }
        if (!category instanceof Category) {
            throw new Error("Invalid data type for category. Object must be an instance of the Category class");
        }
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

    getCategoryName() {
        return this.category.name;
    }

    changeDate(date) {
        this.validateDate(date);
        this.date = date;
    }

    changePrice(price) {
        this.validatePrice(price);

        const balance = new Balance();

        if (this.price < price) {
            balance.decrease(price - this.price);
            this.price = price;
        } else {
            balance.increase(this.price - price);
            this.price = price;
        }
    }

    changeDescription(description) {
        this.validateDescription(description);
        this.description = description;
    }

    changeCategory(category) {
        this.validateCategory(category);
        this.category = category;
    }

    delete() {
        const balance = new Balance();
        balance.increase(this.price);
        super.delete();
    }
}