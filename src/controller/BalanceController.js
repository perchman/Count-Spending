"use strict"

import Balance from "../model/balance/BalanceIndexedDB";
import Url from "../framework/URL";
import BalanceForm from "../forms/BalanceForm";

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

        window.addEventListener('popstate', (e) => this.route.routing());
        window.history.pushState({}, "", url.createUrl(action));
        window.dispatchEvent(new Event('popstate'));
    }

    async index() {
        const balance = new Balance()
        await this.view.render(balance);

        this.addNavbarButtonsEventHandler();
        this.addReplenishButtonEventHandler();
    }

    async replenish() {
        const form = new BalanceForm();
        this.view.render({
            title: 'Replenish balance',
            form: form
        });
        this.addNavbarButtonsEventHandler();

        await form.onSuccessSubmit(async (data) => {
            const balance = new Balance();
            await balance.increase(parseInt(data.replenish));

            this.redirect({action: 'balance/index'});
        });
    }
}