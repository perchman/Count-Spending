"use strict"

export default class BalanceLocalStorage {

    async getValue() {
        return parseInt(localStorage.getItem('balance')) || 0;
    }

    async save(value) {
        localStorage.setItem('balance', value);
    }
}