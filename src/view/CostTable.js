"use strict"

import View from "./View";

export default class CostTable {
    constructor() {
        this.content = document.getElementById('content');
    }

    setView(view) {
        this.view = view;
    }

    render(data) {
        this.content.innerHTML = `
            <a href="?action=cost/create" id="btn-add" class="btn btn-primary">Add cost</a>
            ${this.createTable(data)}
        `;
    }
}