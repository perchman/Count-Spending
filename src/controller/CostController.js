"use strict"

import Cost from "../model/Cost";
import Category from "../model/Category";
import Url from "../framework/URL";

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
                const id = targetUrl.searchParams.get('id');

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

        window.addEventListener('popstate', (e) => this.route.route());
        window.history.pushState({}, "", url.createUrl(action));
        window.dispatchEvent(new Event('popstate'));
    }

    index() {
        const url = new URL(window.location.href);
        const sort = url.searchParams.get('sort') || 'date_desc';
        const pageNum = parseInt(url.searchParams.get('page')) || 1;
        const start = (pageNum - 1) * this.quantityElemsInPage;
        const end = Math.min(
            start + this.quantityElemsInPage,
            Cost.getCount()
        );
        const orderBy = sort.split('_').join(' ');

        const gridViewConfig = {
            sort: {
                defaultOrder: {
                    date: 'desc'
                }
            },
            pagination: {
                pageSize: 10 // quantityInPage
            },
            model: Cost,
            title: 'Costs',
            data: Cost.getAll(orderBy),
            pageNum: pageNum,
            quantityAll: Cost.getCount(),
            quantityInPage: 10,
            firstElem: start,
            lastElem: end
        }

        this.view.render(gridViewConfig);

        this.addNavbarButtonsEventHandler();
        this.addCreateButtonEventHandler();
        this.addUpdateButtonsEventHandler();
        this.addDeleteButtonsEventHandler();
        this.addPaginationButtonsEventHandler();
    }

    create() {
        this.view.render('Create cost', Category.getAll('id desc'));
        this.addNavbarButtonsEventHandler();

        const form = document.getElementById('form-cost');
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            try {
                Cost.create(
                    new Date(formData.get('date')),
                    parseInt(formData.get('price')),
                    formData.get('description')?.toString(),
                    Category.getById(
                        parseInt(formData.get('category'))
                    )
                );

                this.redirect({action: 'cost/index'});
            } catch (error) {
                alert(error);
            }
        })
    }

    update() {
        this.view.render('Update cost', Category.getAll('id desc'));
        this.addNavbarButtonsEventHandler();

        const url = new URL(window.location.href);
        const id = url.searchParams.get('id');
        let cost = Cost.getById(id);

        const form = document.getElementById('form-cost');
        form.elements['date'].value = cost.date.toISOString().split('T')[0];
        form.elements['category'].value = cost.category.id;
        form.elements['price'].value = cost.price;
        form.elements['description'].value = cost.description;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            cost.changeDate(new Date(formData.get('date')));
            cost.changePrice(parseInt(formData.get('price')));
            cost.changeDescription(formData.get('description')?.toString());
            cost.changeCategory(Category.getById(
                parseInt(formData.get('category'))
            ));

            cost.save();

            this.redirect({action: 'cost/index'});
        })
    }

    delete(id) {
        const cost = Cost.getById(id);
        cost.delete();
    }
}
