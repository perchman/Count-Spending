"use strict"

import Balance from "./Balance";

export default class BalanceLocalStorage extends Balance{

    async getValue() {
        return parseInt(localStorage.getItem('balance')) || 0;
    }

    async save(value) {
        localStorage.setItem('balance', value);
    }
}