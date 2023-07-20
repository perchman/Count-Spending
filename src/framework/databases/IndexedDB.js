"use strict"

import Dexie from 'dexie';
import Database from "./Database";

export default class IndexedDB extends Database {
    static getName() {
        throw new Error("This method in not implemented");
    }

    static migration() {
        throw new Error("This method in not implemented");
    }

    static async connect() {
        const db = new Dexie(this.getName());
        db.version(1).stores(this.migration(db));

        return db;
    }
}