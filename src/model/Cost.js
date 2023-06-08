"use strict"

export default class Cost {
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
            }

        }
    }

    setController(controller) {
        this.controller = controller;
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

        this.saveCosts(costs);
        this.saveCostId(id);
    }

    getCosts() {
        const data = JSON.parse(localStorage.getItem('cost'));

        if (data) {
            return data;
        } else {
            new Error("costs not added");
            return null;
        }
    }

    getCostsArray() {
        const costs = this.getCosts() || {};
        return Object.values(costs);
    }

    getCostId() {
        let id = localStorage.getItem('costId');

        if (id) {
            return parseInt(id);
        } else {
            return 1;
        }
    }

    saveCosts(costs) {
        localStorage.setItem('cost', JSON.stringify(costs));
    }

    saveCostId(id) {
        localStorage.setItem(`costId`, JSON.stringify(id + 1));
    }
}