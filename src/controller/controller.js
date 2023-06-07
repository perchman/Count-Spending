"use strict"

import Model from "../model/model";

export default class Controller {
    constructor() {}

    setModel(model) {
        this.model = model;
        return this;
    }

    setView(view) {
        this.view = view;
        return this;
    }

    costIndex() {
        const config = this.model.getConfig('cost/index');

        this.view.renderTablePage(config);
        this.addEventCreateButton();
    }

    categoryIndex() {
        const config = this.model.getConfig('category/index');

        this.view.renderTablePage(config);
        this.addEventCreateButton();
    }

    createCost() {
        const config = this.model.getConfig('cost/create');

        this.view.renderFormPage(config);

        const form = document.getElementById(config.id);
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let data = new FormData(e.target);
            this.model.createCost(data);
        })
    }

    createCategory() {
        const config = this.model.getConfig('category/create');

        this.view.renderFormPage(config);
    }

    addEventsNavbarButtons() {
        const links = document.getElementsByClassName('nav-link');
        for (let link of links) {
            link.addEventListener('click', this.handelClick);
        }
    }

    addEventCreateButton() {
        const button = document.getElementById('btn-add');
        button.addEventListener('click', this.handelClick);
    }

    handelClick = (e) => {
        e.preventDefault();
        window.history.pushState({}, "", e.target.href);

        this.route();
    }

    route() {
        const url = new URL(window.location.href);
        const action = url.searchParams.get('action') || 'cost/index';

        switch (action) {
            case 'cost/index':
                this.costIndex();
                break;

            case 'category/index':
                this.categoryIndex();
                break;

            case 'cost/create':
                this.createCost();
                break;

            case 'category/create':
                this.createCategory();
                break;

            default:
                throw new Error(action + ' route not found');
        }
    }
}