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
        console.log(cost);
        const value = this.getValue() - parseInt(cost.price);
        this.#save(value);
    }

    #save(value) {
        localStorage.setItem('balance', value);
    }
}