"use strict"

import ServiceLocator from "../../framework/ServiceLocator";

export default class BalanceIndexedDB {
    static getDatabaseName() {
        return 'Default';
    }

    async getValue() {
        const db = ServiceLocator.get(this.constructor.getDatabaseName());
        const obj = await db['balance'].get('balance');

        return obj ? parseInt(obj.value) : 0;
    }

    async save(value) {
        const db = ServiceLocator.get(this.constructor.getDatabaseName());
        await db['balance'].put({ key: 'balance', value: value }, 'balance');
    }
}