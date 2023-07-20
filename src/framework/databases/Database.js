"use strict"

export default class Database {
    static async connect() {
        throw new Error("This method in not implemented");
    }

    static async getInstance() {
        if (!this.db) {
            this.db = await this.connect();
        }

        return this.db;
    }
}