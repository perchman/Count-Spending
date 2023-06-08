"use strict"

export default class CategoryController {
    constructor() {}

    setModel(model) {
        this.model = model;
        return this;
    }

    setView(view) {
        this.view = view;
        return this;
    }
}