"use strict"

import LocalStorageActiveRecordModel from "../framework/LocalStorageActiveRecordModel";
import Balance from "../model/Balance";
import Category from "./Category";

export default class Cost extends LocalStorageActiveRecordModel{

    constructor(id, date, price, description, category) {
        super(id);
        // if (typeof date !== "string") {
        //     throw new Error("Invalid data type for date. Type must be a string");
        // }
        // if (typeof price !== "number") {
        //     throw new Error("Invalid data type for price. Type must be a number");
        // }
        // if (typeof description !== "string") {
        //     throw new Error("Invalid data type for description. Type must be a string");
        // }
        if (!category instanceof Category) {
            throw new Error("Invalid data type for category. Object must be an instance of the Category class");
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
        if (typeof date === "string") {
            this.date = date;
        } else {
            throw new Error("Invalid data type for date. Type must be a string");
        }
    }

    changePrice(price) {
        if (typeof price === "number") {
            this.price = price;
        } else {
            throw new Error("Invalid data type for price. Type must be a number");
        }
    }

    changeDescription(description) {
        if (typeof description === "string") {
            this.description = description;
        } else {
            throw new Error("Invalid data type for description. Type must be a string");
        }
    }

    changeCategory(category) {
        if (category instanceof Category) {
            this.category = category;
        } else {
            throw new Error("Invalid data type for category. Object must be an instance of the Category class");
        }
    }

    getCategoryName() {
        return this.category.name;
    }
}