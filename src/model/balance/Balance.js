"use strict"

import BalanceLocalStorage from "./BalanceLocalStorage";
import BalanceIndexedDB from "./BalanceIndexedDB";

export default class Balance extends BalanceLocalStorage {
    async increase(replenishment) {
        const value = await this.getValue() + parseInt(replenishment);
        await this.save(value);
    }

    async decrease(depletion) {
        const value = await this.getValue() - parseInt(depletion);
        if (value < 0) {
            throw new Error("Not enough money on balance");
        }
        await this.save(value);
    }

    async change(value) {
        const result = await this.getValue() + (parseInt(value));
        console.log(result);
        if (result < 0) {
            throw new Error("Not enough money on balance");
        }
        await this.save(result);
    }
}