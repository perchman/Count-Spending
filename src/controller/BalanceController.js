"use strict"

import Balance from "../model/Balance";
import Url from "../framework/URL";

export default class BalanceController {
    constructor(view, route) {
        this.view = view;
        this.route = route;
    }

    addNavbarButtonsEventHandler() {
        const navLinks = document.getElementsByClassName('nav-link');
        for (const navLink of navLinks) {
            navLink.addEventListener('click', (e) => {
                e.preventDefault();
                window.history.pushState({}, "", e.target.href);

                this.route.routing();
            });
        }
    }

    addReplenishButtonEventHandler() {
        const addButton = document.getElementById('btn-replenish');
        addButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.history.pushState({}, "", e.target.href);

            this.route.routing();
        });
    }

    redirect(action) {
        const url = new Url();

        window.addEventListener('popstate', (e) => this.route.route());
        window.history.pushState({}, "", url.createUrl(action));
        window.dispatchEvent(new Event('popstate'));
    }

    index() {
        const balance = new Balance()
        this.view.render(balance.getValue());

        this.addNavbarButtonsEventHandler();
        this.addReplenishButtonEventHandler();
    }

    replenish() {
        this.view.render();
        this.addNavbarButtonsEventHandler();

        const form = document.getElementById('form-balance');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const balance = new Balance();
            balance.increase(parseInt(formData.get('replenish')));

            this.redirect({action: 'balance/index'});
        });
    }
}