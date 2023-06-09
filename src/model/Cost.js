"use strict"

export default class Cost {
    constructor() {
        this.quantityElemsInTable = 5;
    }

    getData(pageNum) {
        const costs = this.getCostsArray();
        const all = costs.length;
        const start = (pageNum - 1) * this.quantityElemsInTable;
        const end = Math.min(start + this.quantityElemsInTable, all)

        return {
            costs: costs.slice(start, end),
            pagination: {
                all: all,
                start: start,
                end: end
            }
        }
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

    updateCost(formData, id) {
        let costs = this.getCosts();
        let cost = {
            date: new Date(formData.get('date')?.toString()).getTime(),
            price: formData.get('price')?.toString(),
            description: formData.get('description')?.toString()
        }

        cost.id = id;
        costs[id] = cost;

        this.saveCosts(costs);
    }

    deleteCost(id) {
        let costs = this.getCosts();
        delete costs[id];

        this.saveCosts(costs);
    }
}