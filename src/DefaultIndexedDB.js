"use strict"

import IndexedDB from "./framework/databases/IndexedDB";

export default class DefaultIndexedDB extends IndexedDB {
    static getName() {
        return 'Default';
    }

    static migration(db) {
        let obj = {};
        if (!db.tables.includes('cost')) {
            obj.cost = '++id, date, price';
        }
        if (!db.tables.includes('category')) {
            obj.category = '++id';
        }
        if (!db.tables.includes('balance')) {
            obj.balance = 'key';
        }
        if (!db.tables.includes('historyBalanceChange')) {
            obj.historyBalanceChange = '++id, date, amount'
        }

        return obj;
    }
}