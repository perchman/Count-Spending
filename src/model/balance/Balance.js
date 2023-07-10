"use strict"

export default class Balance {

    async getValue() {
        throw new Error("This method is not implemented");
    }

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

    async save(value) {
        throw new Error("This method is not implemented");
    }
}