"use strict"

export default class Category {
    constructor() {
        this.configs = {
            'category/index': {
                headers: [
                    {
                        name: 'Id',
                        sort: true
                    },
                    {
                        name: 'Category',
                        sort: false
                    }
                ],
                data: JSON.parse(localStorage.getItem('categories')),
                buttons: {
                    add: {
                        url: '?action=category/create',
                        text: 'Add category'
                    }
                }
            },
            'category/create': {
                id: 'category-form',
                name: 'category',
                fields: [
                    {
                        name: 'category',
                        type: 'text',
                        label: 'Category',
                    }
                ]
            }
        }
    }

    setController(controller) {
        this.controller = controller;
    }

    createCategory(formData) {
        const id = this.getCategoryId();
        let categories = this.getCategories();
        let category = {
            category: formData.get('category')?.toString()
        }

        category.id = id;
        categories[id] = category;

        this.saveCategories(categories);
        this.saveCategoryId(id);
    }

    getCategories() {
        let data = JSON.parse(localStorage.getItem('categories'));

        if (data) {
            return data;
        } else {
            return {};
        }
    }

    getCategoryId() {
        let id = localStorage.getItem('categoryId');

        if (id) {
            return parseInt(id);
        } else {
            return 1;
        }
    }

    saveCategories(categories) {
        localStorage.setItem('categories', JSON.stringify(categories));
    }

    saveCategoryId(id) {
        localStorage.setItem(`categoryId`, JSON.stringify(id + 1));
    }
}