"use strict"

import Balance from "../model/balance/BalanceIndexedDB";
import Url from "../framework/URL";
import BalanceForm from "../forms/BalanceForm";

export default class BalanceController {
    constructor(view, route) {
        this.view = view;
        this.route = route;
    }

    redirect(action) {
        this.route.redirect(Url.createUrl(action));
    }

    async index() {
        const balance = new Balance()
        await this.view.render(balance);
    }

    async replenish() {
        const form = new BalanceForm();
        this.view.render({
            title: 'Replenish balance',
            form: form
        });

        await form.onSuccessSubmit(async (data) => {
            const balance = new Balance();
            await balance.increase(parseInt(data.replenish));

            this.redirect({action: 'balance/index'});
        });
    }
}