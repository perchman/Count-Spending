"use strict"

export default class Cost {
    constructor() {}

    setModel(model) {
        this.model = model;
        return this;
    }

    setViewTable(viewTable) {
        this.viewTable = viewTable;
        return this;
    }

    setViewForm(viewForm) {
        this.viewForm = viewForm;
        return this;
    }

    gatherCostIndex() {
        this.viewTable.render(this.model.getCostsArray());
        this.addEvents();
    }

    addEvents() {
        this.addEventToAddButton();
        this.addEventsToUpdateButtons();
        this.addEventsToDeleteButtons();
    }

    addEventToAddButton() {
        const addButton = document.getElementById('btn-add');
        addButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.history.pushState({}, "", e.target.href);

            this.route();
        });
    }

    addEventsToUpdateButtons() {
        const updateButtons = document.getElementsByClassName('btn-update');
        for (const button of updateButtons) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                window.history.pushState({}, "", e.target.href);

                this.route();
            })
        }
    }

    addEventsToDeleteButtons() {
        const deleteButtons = document.getElementsByClassName('btn-delete');
        for (const button of deleteButtons) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                window.history.pushState({}, "", e.target.href);

                this.route();
            })
        }
    }

    gatherCostCreate() {
        this.viewForm.render();

        const saveButton = document.getElementById('btn-save');
        saveButton.addEventListener('click', (e) => {
            e.preventDefault();

            const form = document.getElementById('form-cost');
            let formData = new FormData(form);
            this.model.createCost(formData);

            this.redirect('?action=cost/index');
        })
    }

    redirect(url) {
        window.addEventListener('popstate', (e) => this.route());
        window.history.pushState({}, "", url);
        window.dispatchEvent(new Event('popstate'));
    }

    route() {
        console.log(this);
        const url = new URL(window.location.href);
        const action = url.searchParams.get('action') || 'cost/index';

        switch (action) {
            case 'cost/index':
                this.gatherCostIndex();
                break;

            case 'cost/create':
                this.gatherCostCreate();
                break;

            default:
                throw new Error(action + ' route not found');
        }
    }
}
