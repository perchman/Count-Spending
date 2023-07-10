"use strict"

import IndexedDB from "./framework/IndexedDB";

export default class DefaultIndexedDB extends IndexedDB {
    static getName() {
        return 'Default';
    }

    static migration() {
        return (database) => {
            if (!database.objectStoreNames.contains('CostStore')) {
                const store = database.createObjectStore('CostStore', {autoIncrement: true});
                store.createIndex('dateIndex', 'date', {unique: false});
                store.createIndex('priceIndex', 'price', {unique:false});
                store.createIndex('idIndex', 'id', {unique: true});
            }
            if (!database.objectStoreNames.contains('CategoryStore')) {
                const store = database.createObjectStore('CategoryStore', {autoIncrement: true});
                store.createIndex('idIndex', 'id', {unique: true});
            }
            if (!database.objectStoreNames.contains('Balance')) {
                database.createObjectStore('Balance');
            }
        };
    }
}