"use strict"

import LocalStorageActiveRecordModel from "../framework/LocalStorageActiveRecordModel";
import Cost from "./Cost";

export default class Category extends LocalStorageActiveRecordModel{
    constructor(id, name) {
        super(id);
        this.validationName(name);
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
        const category = this.makeModel({
            id: id,
            name: name
        })

        category.save();

        return category;
    }

    validationName(name) {
        if (typeof name !== "string") {
            throw new Error("Invalid data type for name of category. Type must be a string");
        }
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name
        }
    }

    changeName(name) {
        this.validationName(name);
        this.name = name;
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