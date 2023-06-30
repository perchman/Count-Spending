"use strict"

import LocalStorageActiveRecordModel from "../framework/LocalStorageActiveRecordModel";
import Cost from "./Cost";

export default class Category extends LocalStorageActiveRecordModel{
    constructor(id, name) {
        super(id);
        this.name = name;
        this.validate(name);
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
        const category = new Category(
            null,
            name
        )

        category.save();

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

    checkCanRemove() {
        if (Cost.existsCostsHasCategory(this.id)) {
            throw new Error(`Can't delete category ${this.name}. The category has costs`);
        }
    }
    delete() {
        this.checkCanRemove();
        super.delete();
    }
}