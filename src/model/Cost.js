"use strict"

import IndexedDBActiveRecordModel from "../framework/IndexedDBActiveRecordModel";
import LocalStorageActiveRecordModel from "../framework/LocalStorageActiveRecordModel";
import Balance from "./balance/Balance";
import Category from "./Category";
import Transaction from "./balance/Transaction";

export default class Cost extends LocalStorageActiveRecordModel {
    constructor(id, date, price, description, category) {
        super(id);
        this.date = date;
        this.price = price;
        this.description = description;
        this.category = category;

        this.validate();

        this.initData = {
            date: date,
            price: price,
            description: description,
            category: category
        }
    }

    static getEntityName() {
        return 'Cost';
    }

    static getDatabaseName() {
        return 'Default';
    }

    static async makeModel(data) {
        return new Cost(
            data.id,
            new Date(data.date),
            data.price,
            data.description,
            await Category.getById(data.categoryId)
        );
    }

    static async create(date, price, description, category) {
        const cost = new Cost(
            null,
            date,
            price,
            description,
            category
        )

        await cost.save();

        return cost;
    }

    static async existsCostsHasCategory(categoryId) {
        const costs = await Cost.getAllRaw();
        for (let cost in costs) {
            if (costs[cost].categoryId === categoryId) {
                return true;
            }
        }
        return false;
    }

    validate() {
        this.validateDate();
        this.validateCategory();
        this.validatePrice();
        this.validateDescription();
    }

    validateDate() {
        if (typeof this.date !== "object") {
            throw new Error("Invalid data type for date. Type must be a object");
        }
        if (!this.date instanceof Date) {
            throw new Error("Invalid data type for date. Object must be an instance of the Date object");
        }
    }

    validatePrice() {
        if (typeof this.price !== "number") {
            throw new Error("Invalid data type for price. Type must be a number");
        }
    }

    validateDescription() {
        if (typeof this.description !== "string") {
            throw new Error("Invalid data type for description. Type must be a string");
        }
    }

    validateCategory() {
        if (typeof this.category !== "object") {
            throw new Error("Invalid data type for category. Type must be a object");
        }
        if (!this.category instanceof Category) {
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

    async save() {
        const isNew = !this.id;

        // const storeNames = [
        //     this.constructor.getStoreName(),
        //     Balance.getStoreName()
        // ];

        await super.save();

        let typeTransaction;
        let amountTransaction;

        if (isNew) {
            typeTransaction = 'deduction';
            amountTransaction = -this.price;
            // await balance.decrease(this.price);
        } else {
            if (this.initData.price < this.price) {
                typeTransaction = 'deduction';
                amountTransaction = -(this.price - this.initData.price);
                // await balance.decrease(this.price - this.initData.price);
            } else {
                typeTransaction = 'refund';
                amountTransaction = this.initData.price - this.price;
                // await balance.increase(this.initData.price - this.price);
            }
        }

        const transaction = await Transaction.create(
            this.date,
            typeTransaction,
            amountTransaction
        )

        // const updateBalance = async () => {
        //     const balance = new Balance();
        //     if (isNew) {
        //         await balance.decrease(this.price);
        //     } else {
        //         if (this.initData.price < this.price) {
        //             await balance.decrease(this.price - this.initData.price);
        //         } else {
        //             await balance.increase(this.initData.price - this.price);
        //         }
        //     }
        // };


        // const transaction = await this.beginTransaction(storeNames);
        // await Promise.all([
        //     await super.save(transaction),
        //     await updateBalance(),
        //     transaction.done,
        // ]);
    }


    async delete() {
        const transaction = await Transaction.create(
            new Date,
            'refund',
            this.price
        )

        await super.delete();
    }
}