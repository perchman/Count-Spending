"use strict"

import LocalStorageActiveRecordModel from "../framework/LocalStorageActiveRecordModel";
import IndexedDBActiveRecordModel from "../framework/IndexedDBActiveRecordModel";
import Cost from "./Cost";

export default class Category extends IndexedDBActiveRecordModel {
    constructor(id, name) {
        super(id);
        this.name = name;
        this.validate(name);
    }

    static getEntityName() {
        return 'Category';
    }

    static getDatabaseName() {
        return 'Default';
    }

    static makeModel(data) {
        return new Category(
            data.id,
            data.name
        );
    }

    static async create(name) {
        const category = new Category(
            null,
            name
        )

        await category.save();

        return category;
    }

    validate() {
        if (typeof this.name !== "string") {
            throw new Error("Invalid data type for name of category. Type must be a string");
        }
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name
        }
    }

    async checkCanRemove() {
        if (await Cost.existsCostsHasCategory(this.id)) {
            throw new Error(`Can't delete category ${this.name}. The category has costs.`);
        }
    }
    async delete() {
        await this.checkCanRemove();
        await super.delete();
    }
}