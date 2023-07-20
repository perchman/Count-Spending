"use strict"

import Cost from "../model/Cost";
import Category from "../model/Category";
import Url from "../framework/URL";
import DataProvider from "../framework/DataProvider";
import CostForm from "../forms/CostForm";

export default class CostController {
    constructor(view, route) {
        this.view = view;
        this.route = route;
    }

    addDeleteButtonsEventHandler() {
        const deleteButtons = document.getElementsByClassName('btn-delete');
        for (let button of deleteButtons) {
            button.addEventListener('click', async (e) => {
                e.preventDefault();
                const url = new URL(window.location.href);
                const targetUrl = new URL(e.target.href);
                const id = parseInt(targetUrl.searchParams.get('id'));

                await this.delete(id);

                window.history.pushState({}, "", url);
                this.route.routing();
            });
        }
    }

    redirect(action) {
        this.route.redirect(Url.createUrl(action));
    }

    async index() {
        const url = new URL(window.location.href);
        const sort = url.searchParams.get('sort');

        const dataProvider = new DataProvider({
            sort: {
                defaultOrder: 'date desc',
                orderBy: sort
            },
            model: Cost,
            pagination: {
                pageSize: 5
            }
        });

        await this.view.render({
            title: 'Costs',
            dataProvider: dataProvider
        });
    }

    async create() {
        const form = new CostForm();

        await this.view.render({
            title: 'Create cost',
            form: form
        });

        await form.onSuccessSubmit(async (data) => {
            try {
                await Cost.create(
                    new Date(data.date),
                    parseInt(data.price),
                    data.description,
                    await Category.getById(
                        parseInt(data.category)
                    )
                );

                // this.redirect({action: 'cost/index'});
            } catch (error) {
                alert(error);
            }
        });
    }

    async update() {
        const url = new URL(window.location.href);
        const id = parseInt(url.searchParams.get('id'));
        let cost = await Cost.getById(id);

        const form = new CostForm(cost);

        await this.view.render({
            title: 'Update cost',
            form: form
        });

        await form.onSuccessSubmit(async (data) => {
            try {
                cost.date = new Date(data.date);
                cost.price = parseInt(data.price);
                cost.description = data.description;
                cost.category = await Category.getById(
                    parseInt(data.category)
                );

                await cost.save();

                this.redirect({action: 'cost/index'});
            } catch (error) {
                alert(error);
            }
        })
    }

    async delete() {
        const url = new URL(window.location.href);
        const id = parseInt(url.searchParams.get('id'));
        const cost = await Cost.getById(id);

        let data = {
            title: 'Success!',
            class: 'alert-success',
            text: 'Cost #' + cost.id + ' removed.'
        };

        try {
            await cost.delete();
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
