"use strict"

export default class Cost {
    constructor() {}

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
            return {};
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

    getCostById(id) {
        return this.getCosts()[id];
    }

    saveCosts(costs) {
        localStorage.setItem('cost', JSON.stringify(costs));
    }

    saveCostId(id) {
        localStorage.setItem(`costId`, JSON.stringify(id + 1));
    }
}