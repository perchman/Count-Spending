"use strict"

export default class Model {
    constructor() {
        this.configs = {
            'cost/index': {
                headers: [
                    {
                        name: 'Date',
                        sort: true
                    },
                    {
                        name:'Price',
                        sort: true
                    },
                    {
                        name: 'Description',
                        sort: false
                    }
                ],
                data: JSON.parse(localStorage.getItem('costs')),
                buttons: {
                    add: {
                        url: '?action=cost/create',
                        text: 'Add cost'
                    }
                }
            },
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
            'cost/create': {
                id: 'cost-form',
                name: 'cost',
                fields: [
                    {
                        name: 'date',
                        type: 'date',
                        label: 'Date',
                    },
                    {
                        name: 'price',
                        type: 'number',
                        label: 'Price',
                    },
                    {
                        name: 'description',
                        type: 'text',
                        label: 'Description',
                    }
                ]
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
        };
    }

    setController(controller) {
        this.controller = controller;
        return this;
    }

    getConfig(config) {
        return this.configs[config];
    }


    createCost(formData) {
        const id = this.getCostId();
        let costs = this.getCosts();
        let cost = {
            date: new Date(formData.get('date')?.toString()).getTime(),
            price: formData.get('price')?.toString(),
            description: formData.get('description')?.toString()
        }

        cost.id = id;
        costs[id] = cost;

        this.saveEntities('cost', costs);
        this.saveEntityId('cost', id);
    }

    createCategory(formData) {
        const id = this.getCategoryId();
        let categories = this.getCategories();
        let category = {
            category: formData.get('category')?.toString()
        }

        category.id = id;
        categories[id] = category;

        this.saveEntities('category', categories);
        this.saveEntityId('category', id);
    }

    getEntities(name) {
        let data = JSON.parse(localStorage.getItem(name));
        if (data) {
            return data;
        } else {
            return {};
        }
    }

    getCosts() {
        return this.getEntities('cost');
    }

    getCategories() {
        return this.getEntities('category');
    }

    getEntityId(entityName) {
        let id = localStorage.getItem(`${entityName}Id`);

        if (id) {
            return parseInt(id);
        } else {
            return 1;
        }
    }

    getCostId() {
        return this.getEntityId('cost');
    }

    getCategoryId() {
        return this.getEntityId('category');
    }

    saveEntities(key, entity) {
        localStorage.setItem(key, JSON.stringify(entity));
    }

    saveEntityId(key, id) {
        localStorage.setItem(`${key}Id`, JSON.stringify(id + 1));
    }
}


