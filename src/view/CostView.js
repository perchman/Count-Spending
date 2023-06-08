"use strict"

export default class CostView {
    constructor() {
        this.content = document.getElementById('content');
    }

    setController(controller) {
        this.controller = controller;
    }

    renderTable(data) {
        data.forEach((elem) => {

        })
    }

    renderRow() {

    }

    render(data) {
        this.content.innerHTML = `
            <a href="?action=cost/create" class="btn btn-primary">Add cost</a>
            ${this.renderTable(data)}
        `;
    }
}