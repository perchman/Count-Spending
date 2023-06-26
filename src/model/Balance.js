"use strict"

export default class Balance {

    getValue() {
        return parseInt(localStorage.getItem('balance')) || 0;
    }

    increase(replenishment) {
        const value = this.getValue() + parseInt(replenishment);
        this.#save(value);
    }

    decrease(depletion) {
        const value = this.getValue() - parseInt(depletion);
        if (value < 0) {
            throw new Error("Not enough money on balance");
        }
        this.#save(value);
    }

    #save(value) {
        localStorage.setItem('balance', value);
    }
}