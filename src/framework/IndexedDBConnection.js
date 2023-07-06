"use strict"

import {openDB} from "idb";

export default class IndexedDBConnection {
    static async connect() {
        return await openDB(
            'DataBase',
            1,
            {
                upgrade: (database) => {
                    database.createObjectStore('CostStore', {keyPath: 'id'});
                    database.createObjectStore('CostId');
                    database.createObjectStore('CategoryStore', {keyPath: 'id'});
                    database.createObjectStore('CategoryId');
                    database.createObjectStore('Balance');
                }
            }
        );
    }

    static async getStore(storeName) {
        const database = await this.connect();
        const transaction = database.transaction(storeName, "readwrite");
        return transaction.store;
    }
}