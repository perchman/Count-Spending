"use strict"

import LocalStorageActiveRecordModel from "../../framework/LocalStorageActiveRecordModel";
import IndexedDBActiveRecordModel from "../../framework/IndexedDBActiveRecordModel";
import Balance from "./Balance";

export default class HistoryBalanceChange extends IndexedDBActiveRecordModel {
    constructor(id, date, type, amount) {
        super(id);
        this.date = date;
        this.type = type;
        this.amount = amount;

        this.validate();
    }

    static getEntityName() {
        return 'historyBalanceChange';
    }

    static getDatabaseName() {
        return 'Default';
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
        const transaction = new HistoryBalanceChange(
            null,
            date,
            type,
            amount
        )

        await transaction.save();

        return transaction;
    }

    static async makeModel(data) {
        return new HistoryBalanceChange(
            data.id,
            new Date(data.date),
            data.type,
            data.amount
        );
    }
    toJSON() {
        let obj = {
            id: this.id,
            date: new Date(this.date).getTime(),
            type: this.type,
            amount: this.amount
        };

        if (!this.id) {
            delete obj.id;
        }

        return obj;
    }
}