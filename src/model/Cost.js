"use strict"

export default class Cost {
    constructor() {}

    // getData(pageNum) {
    //     const costs = this.getCostsArray();
    //     const all = costs.length;
    //     const start = (pageNum - 1) * this.quantityElemsInTable;
    //     const end = Math.min(start + this.quantityElemsInTable, all)
    //
    //     return {
    //         costs: costs.slice(start, end),
    //         pagination: {
    //             all: all,
    //             start: start,
    //             end: end
    //         }
    //     }
    // }

    getCosts() {
        return JSON.parse(localStorage.getItem('cost')) || {};
    }

    getCostsArray() {
        return Object.values(this.getCosts()) || [];
    }

    getCostId() {
        return parseInt(localStorage.getItem('costId')) || 1;
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