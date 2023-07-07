"use strict"

import IndexedDB from "./framework/IndexedDB";

export default class DefaultIndexedDB extends IndexedDB {
    static getName() {
        return 'Default';
    }

    static migration() {
        return (database) => {
            if (!database.objectStoreNames.contains('CostStore')) {
                database.createObjectStore('CostStore', {autoIncrement: true});
            }
            if (!database.objectStoreNames.contains('CategoryStore')) {
                database.createObjectStore('CategoryStore', {autoIncrement: true});
            }
        };
    }
}