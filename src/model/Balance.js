"use strict"

export default class Balance {

    getValue() {
        return parseInt(localStorage.getItem('balance')) || 0;
    }

    increase(replenishment) {
        const value = this.getValue() + replenishment;
        this.#save(value);
    }

    decrease(writeOff) {
        const value = this.getValue() - writeOff;
        this.#save(value);
    }

    #save(value) {
        localStorage.setItem('balance', value);
    }
}