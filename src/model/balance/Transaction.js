"use strict"

import LocalStorageActiveRecordModel from "../../framework/LocalStorageActiveRecordModel";
import Balance from "./Balance";

export default class Transaction extends LocalStorageActiveRecordModel {
    constructor(id, date, type, amount) {
        super(id);
        this.date = date;
        this.type = type;
        this.amount = amount;

        this.validate();
    }

    static getEntityName() {
        return 'Transaction';
    }

    validate() {
        if (typeof this.date !== "object") {
            throw new Error("Invalid data type for date. Type must be a object");
        }
        if (!this.date instanceof Date) {
            throw new Error("Invalid data type for date. Object must be an instance of the Date object");
        }
    }

    static async create(date, type, amount) {
        const transaction = new Transaction(
            null,
            date,
            type,
            amount
        )

        await transaction.save();

        return transaction;
    }

    static async makeModel(data) {
        return new Transaction(
            data.id,
            new Date(data.date),
            data.type,
            data.amount
        );
    }
    toJSON() {
        return {
            id: this.id,
            date: new Date(this.date).getTime(),
            type: this.type,
            amount: this.amount
        };
    }

    async save() {
        const balance = new Balance();
        await balance.change(this.amount);

        await super.save();
    }
}