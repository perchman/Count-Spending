"use strict"

import BalanceLocalStorage from "./BalanceLocalStorage";
import BalanceIndexedDB from "./BalanceIndexedDB";
import HistoryBalanceChange from "./HistoryBalanceChange";

export default class Balance extends BalanceIndexedDB {
    constructor() {
        super();
    }
    async increase(value, date, type) {
        const result = await this.getValue() + parseInt(value);
        await this.save(result, value, date, type);
    }

    async decrease(value, date, type) {
        const result = await this.getValue() - parseInt(value);
        if (result < 0) {
            throw new Error("Not enough money on balance");
        }

        await this.save(result, value, date, type);
    }

    async save(result, value, date, type) {
        await super.save(result);

        const historyBalanceChange = await HistoryBalanceChange.create(
            new Date(date),
            type,
            value
        );
    }
}