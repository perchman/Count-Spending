"use strict"

import {openDB} from "idb";

export default class IndexedDB {
    static getName() {
        throw new Error("This method in not implemented");
    }

    static migration() {
        throw new Error("This method in not implemented");
    }

    static async connect() {
        return await openDB(
            this.getName(),
            1,
            { upgrade: this.migration() }
        );
    }

    static async getInstance() {
        if (!this.database) {
            this.database = await this.connect();
        }

        return this.database;
    };
}