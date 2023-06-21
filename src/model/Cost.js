"use strict"

import LocalStorageActiveRecordModel from "../framework/LocalStorageActiveRecordModel";
import Balance from "../model/Balance";
import Category from "./Category";

export default class Cost extends LocalStorageActiveRecordModel{

    constructor(id, date, price, description, category) {
        super(id);
        this.validationDate(date);
        this.validationPrice(price);
        this.validationDescription(description);
        this.validationCategory(category);

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

        balance.decrease(cost);
        cost.save();

        return cost;
    }

    validationDate(date) {
        // if (typeof date !== "object") {
        //     throw new Error("Invalid data type for date. Type must be a object");
        // }
        if (!date instanceof Date) {
            throw new Error("Invalid data type for date. Object must be an instance of the Date object");
        }
    }

    validationPrice(price) {
        if (typeof price !== "number") {
            throw new Error("Invalid data type for price. Type must be a number");
        }
    }

    validationDescription(description) {
        if (typeof description !== "string") {
            throw new Error("Invalid data type for description. Type must be a string");
        }
    }

    validationCategory(category) {
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

    changeDate(date) {
        this.validationDate(date);
        this.date = date;
    }

    changePrice(price) {
        this.validationPrice(price);
        this.price = price;
    }

    changeDescription(description) {
        this.validationDescription(description);
        this.description = description;
    }

    changeCategory(category) {
        this.validationCategory(category);
        this.category = category;
    }

    getCategoryName() {
        return this.category.name;
    }
}