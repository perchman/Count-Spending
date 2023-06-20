"use strict"

import LocalStorageActiveRecordModel from "../framework/LocalStorageActiveRecordModel";
import Cost from "./Cost";

export default class Category extends LocalStorageActiveRecordModel{
    constructor(id, name) {
        super(id);
        this.name = name;
    }

    static getEntityName() {
        return 'category';
    }

    static makeModel(data) {
        return new Category(
            data.id,
            data.name
        );
    }

    static create(name) {
        const id = this.getNextId();
        const category = new Category(id, name);

        category.save();

        return new Category(id, category);
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name
        }
    }

    changeName(category) {
        this.name = category;
    }

    checkCanRemove() {
        const costs = Cost.getAllRaw();

        for (let cost in costs) {
            if (costs[cost].categoryId === this.id) {
                throw new Error(`Can't delete category ${this.name}. The category has costs`);
            }
        }
    }
    delete() {
        this.checkCanRemove();
        super.delete();
    }
}