"use strict"

export default class Balance {

    getValue() {
        return parseInt(localStorage.getItem('balance')) || 0;
    }

    increase(replenishment) {
        const value = this.getValue() + parseInt(replenishment);
        this.#save(value);
    }

    decrease(cost) {
        const value = this.getValue() - parseInt(cost.price);
        if (value < 0) {
            throw new Error("Not enough money on balance");
        }
        this.#save(value);
    }

    #save(value) {
        localStorage.setItem('balance', value);
    }
}