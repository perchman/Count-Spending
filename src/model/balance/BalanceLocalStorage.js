"use strict"

export default class BalanceLocalStorage {

    async getValue() {
        return parseInt(localStorage.getItem('Balance')) || 0;
    }

    async save(value) {
        localStorage.setItem('Balance', value);
    }
}