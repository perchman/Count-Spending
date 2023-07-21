"use strict"

import Balance from "../model/balance/Balance";
import Url from "../framework/URL";
import BalanceForm from "../forms/BalanceForm";
import DataProvider from "../framework/DataProvider";
import HistoryBalanceChange from "../model/balance/HistoryBalanceChange";

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
            await balance.increase(
                parseInt(data.replenish),
                data.date,
                'replenishment'
                );

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
            model: HistoryBalanceChange,
            pagination: {
                pageSize: 5
            }
        });

        await this.view.render({
            title: 'History',
            dataProvider: dataProvider
        });
    }

    async deleteHistoryChange() {
        const url = new URL(window.location.href);
        const id = parseInt(url.searchParams.get('id'));
        const historyBalanceChange = await HistoryBalanceChange.getById(id);

        let data = {
            title: 'Success!',
            class: 'alert-success',
            text: 'History balance change #' + historyBalanceChange.id + ' removed.'
        };

        try {
            await historyBalanceChange.delete();
        } catch (error) {
            data = {
                title: 'Error!',
                class: 'alert-danger',
                text: error.message
            }
        }

        this.view.render(data);
    }
}