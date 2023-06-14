"use strict"

export default class Category {
    constructor(id, category) {
        this.id = id;
        this.category = category;
    }

    static getAllRaw() {
        const categories = JSON.parse(localStorage.getItem('category')) || {};

        for (let category in categories) {
            categories[category] = new Category(
                categories[category].id,
                categories[category].category
            );
        }

        return categories;
    }

    static getAllAsArray() {
        return Object.values(this.getAllRaw()) || [];
    }

    static getCategoryId() {
        return parseInt(localStorage.getItem('categoryId')) || 1;
    }

    static getById(id) {
        return this.getAllRaw()[id];
    }

    static saveId(id) {
        localStorage.setItem(`categoryId`, JSON.stringify(id + 1));
    }

    static create(category) {
        const id = this.getCategoryId();
        this.saveId(id);

        return new Category(id, category);
    }

    save() {
        let categories = Category.getAllRaw();
        categories[this.id] = {
            id: this.id,
            category: this.category
        };

        localStorage.setItem('category', JSON.stringify(categories));
    }

    delete() {
        let categories = Category.getAllRaw();
        delete categories[this.id];

        this.save(categories);
    }

    changeCategory(category) {
        this.category = category;
    }
}