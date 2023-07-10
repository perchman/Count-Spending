"use strict"

import Balance from "./Balance";
import ServiceLocator from "../../framework/ServiceLocator";

export default class BalanceIndexedDB extends Balance {
    static getDatabaseName() {
        return 'Default';
    }

    async getValue() {
        const database = ServiceLocator.get(this.constructor.getDatabaseName());
        const transaction = database.transaction('Balance', 'readwrite');
        const store = transaction.store;

        return parseInt(await store.getAll()) || 0;
    }

    async save(value) {
        const database = ServiceLocator.get(this.constructor.getDatabaseName());
        const transaction = database.transaction('Balance', 'readwrite');
        const store = transaction.store;

        store.put(value, 'balance');
    }
}