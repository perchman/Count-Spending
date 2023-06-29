"use strict"

import Balance from "../model/Balance";
import Url from "../framework/URL";
import BalanceReplenish from "../view/balance/BalanceReplenish";

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

    index() {
        const balance = new Balance()
        this.view.render(balance.getValue());

        this.addNavbarButtonsEventHandler();
        this.addReplenishButtonEventHandler();
    }

    replenish() {
        const form = new BalanceReplenish();
        this.view.render({
            title: 'Replenish balance',
            form: form
        });
        this.addNavbarButtonsEventHandler();

        form.onSuccessSubmit((data) => {
            const balance = new Balance();
            balance.increase(parseInt(data.replenish));

            this.redirect({action: 'balance/index'});
        });
    }
}