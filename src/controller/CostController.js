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

    addCreateButtonEventHandler() {
        const addButton = document.getElementById('btn-add');
        addButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.history.pushState({}, "", e.target.href);

            this.route.routing();
        });
    }

    addSortButtonsEventHandler() {
        const sortButton = document.getElementsByClassName('btn-sort');
        for (let button of sortButton) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                window.history.pushState({}, "", e.target.href);

                this.route.routing();
            });
        }
    }

    addUpdateButtonsEventHandler() {
        const updateButtons = document.getElementsByClassName('btn-update');
        for (let button of updateButtons) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                window.history.pushState({}, "", e.target.href);

                this.route.routing();
            });
        }
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

    addPaginationButtonsEventHandler() {
        const paginationButtons = document.getElementsByClassName('btn-pagination');
        for (let button of paginationButtons) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                window.history.pushState({}, "", e.target.href);

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
            dataProvider: dataProvider,
            route: this.route
        });

        // this.addNavbarButtonsEventHandler();
        // this.addCreateButtonEventHandler();
        // this.addSortButtonsEventHandler();
        // this.addUpdateButtonsEventHandler();
        // this.addDeleteButtonsEventHandler();
        // this.addPaginationButtonsEventHandler();
    }

    async create() {
        const form = new CostForm();

        await this.view.render({
            title: 'Create cost',
            form: form
        });

        this.addNavbarButtonsEventHandler();

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

                this.redirect({action: 'cost/index'});
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

        this.addNavbarButtonsEventHandler();

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

    //@todo переделать delete
    async delete(id) {
        const cost = await Cost.getById(id);
        await cost.delete();
    }
}
