"use strict"

export default class Category {
    constructor(id, category) {
        this.id = id;
        this.category = category;
    }

    static getCategories() {
        return JSON.parse(localStorage.getItem('category')) || {};
    }

    static getCategoriesArray() {
        return Object.values(this.getCategories()) || [];
    }

    static getCategoryId() {
        return parseInt(localStorage.getItem('categoryId')) || 1;
    }

    static getById(id) {
        const data = this.getCategories()[id];

        return new Category(
            id,
            data.category
        );
    }

    static saveId(id) {
        localStorage.setItem(`categoryId`, JSON.stringify(id + 1));
    }

    static create(category) {
        const id = this.getCategoryId();
        this.saveId(id);

        return new Category(id, category);
    }

    save(categories) {
        categories = categories || null;

        if (!categories) {
            categories = Category.getCategories();
            categories[this.id] = {
                id: this.id,
                category: this.category
            };
        }

        localStorage.setItem('category', JSON.stringify(categories));
    }

    delete() {
        let categories = Category.getCategories();
        delete categories[this.id];

        this.save(categories);
    }

    changeCategory(category) {
        this.category = category;
    }
}