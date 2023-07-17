"use strict"

import ServiceLocator from "../../framework/ServiceLocator";

export default class BalanceIndexedDB {
    static getDatabaseName() {
        return 'Default';
    }

    static getStoreName() {
        return 'Balance';
    }

    async getValue(store) {
        if (!store) {
            const database = ServiceLocator.get(this.constructor.getDatabaseName());
            const transaction = database.transaction(this.constructor.getStoreName());
            store = transaction.store;
        }

        return parseInt(await store.get('balance')) || 0;
    }

    async save(value, store) {
        if (!store) {
            const database = ServiceLocator.get(this.constructor.getDatabaseName());
            const transaction = database.transaction(this.constructor.getStoreName(), 'readwrite');
            store = transaction.store;
        }

        store.put(value, 'balance');
    }
}