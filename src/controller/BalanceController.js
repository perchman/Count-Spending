"use strict"

import Balance from "../model/balance/Balance";
import Url from "../framework/URL";
import BalanceForm from "../forms/BalanceForm";
import DataProvider from "../framework/DataProvider";
import Transaction from "../model/balance/Transaction";

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
            const replenish = Transaction.create(
                new Date(data.date),
                'replenishment',
                parseInt(data.replenish)
            )

            // const balance = new Balance();
            // await balance.increase(parseInt(data.replenish));

            this.redirect({action: 'balance/index'});
        });
    }

    async history() {
        const url = new URL(window.location.href);
        const sort = url.searchParams.get('sort');

        const dataProvider = new DataProvider({
            sort: {
                defaultOrder: 'id desc',
                orderBy: sort
            },
            model: Transaction,
            pagination: {
                pageSize: 5
            }
        });

        await this.view.render({
            title: 'History',
            dataProvider: dataProvider
        });
    }
}