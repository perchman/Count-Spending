"use strict"

import {openDB} from "idb";

export default class IndexedDBConnection {
    static async connect() {
        return await openDB(
            'DataBase',
            1,
            {
                upgrade: (database) => {
                    if (!database.objectStoreNames.length) {
                        database.createObjectStore('CostStore', {autoIncrement: true});
                        database.createObjectStore('CategoryStore', {autoIncrement: true});
                    }
                }
            }
        );
    }

    static async getDatabase() {
        if (!this.database) {
            this.database = await this.connect();
        }

        return this.database;
    };

    static async getStore(storeName) {
        const database = await this.connect();
        const transaction = database.transaction(storeName, "readwrite");
        return transaction.store;
    }
}