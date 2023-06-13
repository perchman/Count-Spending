"use strict"

export default class Cost {
    constructor(model, view, route) {
        this.model = model;
        this.view = view;
        this.route = route;
    }

    addNavbarButtonsEventHandler() {
        const navLinks = document.getElementsByClassName('nav-link');
        for (const navLink of navLinks) {
            navLink.addEventListener('click', (e) => {
                e.preventDefault();
                window.history.pushState({}, "", e.target.href);

                this.route.route();
            });
        }
    }

    addEventToAddButton() {
        const addButton = document.getElementById('btn-add');
        addButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.history.pushState({}, "", e.target.href);

            this.route.route();
        });
    }

    addEventsToUpdateButtons() {
        const updateButtons = document.getElementsByClassName('btn-update');
        for (const button of updateButtons) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                window.history.pushState({}, "", e.target.href);

                this.route.route();
            });
        }
    }

    addEventsToDeleteButtons() {
        const deleteButtons = document.getElementsByClassName('btn-delete');
        for (const button of deleteButtons) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                window.history.pushState({}, "", e.target.href);

                this.route.route();
            });
        }
    }

    redirect(action) {
        const url = this.url.createUrl(action);

        window.addEventListener('popstate', (e) => this.route.route());
        window.history.pushState({}, "", url);
        window.dispatchEvent(new Event('popstate'));
    }

    index() {
        const url = new URL(window.location.href);

        this.view.render(this.model.getCostsArray());
        this.addHandlers();
    }

    create() {
        this.view.render();
        this.addNavbarButtonsEventHandler();

        const form = document.getElementById('form-cost');
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            this.model.createCost(formData);

            this.redirect({action: 'cost/index'});
        })
    }

    update() {
        this.view.render();

        const url = new URL(window.location.href);
        const id = url.searchParams.get('id');
        let cost = this.model.getCostById(id);

        const form = document.getElementById('form-cost');
        form.elements['date'].value = new Date(cost.date).toISOString().split('T')[0];
        form.elements['price'].value = cost.price;
        form.elements['description'].value = cost.description;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            this.model.updateCost(formData, id);

            this.redirect({action: 'cost/index'});
        })
    }
}
