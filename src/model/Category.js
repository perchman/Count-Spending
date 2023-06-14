"use strict"

import LocalStorageActiveRecordModel from "../framework/LocalStorageActiveRecordModel";

export default class Category extends LocalStorageActiveRecordModel{
    constructor(id, category) {
        super(id);
        this.category = category;
    }

    static getEntityName() {
        return 'category';
    }

    static makeModel(data) {
        return new Category(
            data.id,
            data.category
        );
    }

    static create(category) {
        const id = this.getNextId();

        return new Category(id, category);
    }

    toJSON() {
        return {
            id: this.id,
            category: this.category
        }
    }

    changeCategory(category) {
        this.category = category;
    }
}