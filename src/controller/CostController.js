"use strict"

import Cost from "../model/Cost";
import Category from "../model/Category";
import Url from "../framework/URL";
import DataProvider from "../framework/DataProvider";
import CostForm from "../forms/CostForm";
import CostUpdate from "../view/cost/CostUpdate";

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
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const url = new URL(window.location.href);
                const targetUrl = new URL(e.target.href);
                const id = parseInt(targetUrl.searchParams.get('id'));

                this.delete(id);

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
        const url = new Url();

        window.addEventListener('popstate', (e) => this.route.routing());
        window.history.pushState({}, "", url.createUrl(action));
        window.dispatchEvent(new Event('popstate'));
    }

    index() {
        const url = new URL(window.location.href);
        const sort = url.searchParams.get('sort') || 'date_desc';
        const orderBy = sort.split('_').join(' ');

        const dataProvider = new DataProvider({
            sort: {
                defaultOrder: {
                    date: 'desc'
                }
            },
            model: Cost,
            pagination: {
                pageSize: 5
            }
        });

        this.view.render({
            title: 'Costs',
            dataProvider: dataProvider
        });

        this.addNavbarButtonsEventHandler();
        this.addCreateButtonEventHandler();
        this.addUpdateButtonsEventHandler();
        this.addDeleteButtonsEventHandler();
        this.addPaginationButtonsEventHandler();
    }

    create() {
        const form = new CostForm();

        this.view.render({
            title: 'Create cost',
            form: form
        });

        this.addNavbarButtonsEventHandler();

        form.onSuccessSubmit((data) => {
            try {
                Cost.create(
                    new Date(data.date),
                    parseInt(data.price),
                    data.description,
                    Category.getById(
                        parseInt(data.category)
                    )
                );

                this.redirect({action: 'cost/index'});
            } catch (error) {
                alert(error);
            }
        });
    }

    update() {
        const url = new URL(window.location.href);
        const id = parseInt(url.searchParams.get('id'));
        let cost = Cost.getById(id);

        const form = new CostForm(cost);

        this.view.render({
            title: 'Update cost',
            form: form
        });

        this.addNavbarButtonsEventHandler();

        form.onSuccessSubmit((data) => {
            try {
                cost.changeDate(new Date(data.date));
                cost.changePrice(parseInt(data.price));
                cost.changeDescription(data.description);
                cost.changeCategory(Category.getById(
                    parseInt(data.category)
                ));

                cost.update();

                this.redirect({action: 'cost/index'});
            } catch (error) {
                alert(error);
            }
        })
    }

    delete(id) {
        const cost = Cost.getById(id);
        cost.delete();
    }
}
