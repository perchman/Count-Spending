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

                this.route.route();
            });
        }
    }

    addCreateButtonEventHandler() {
        const addButton = document.getElementById('btn-add');
        addButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.history.pushState({}, "", e.target.href);

            this.route.route();
        });
    }

    addUpdateButtonsEventHandler() {
        const updateButtons = document.getElementsByClassName('btn-update');
        for (const button of updateButtons) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                window.history.pushState({}, "", e.target.href);

                this.route.route();
            });
        }
    }

    addDeleteButtonsEventHandler() {
        const deleteButtons = document.getElementsByClassName('btn-delete');
        for (const button of deleteButtons) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const url = new URL(window.location.href);
                const targetUrl = new URL(e.target.href);
                const id = targetUrl.searchParams.get('id');

                this.delete(id);

                window.history.pushState({}, "", url);
                this.route.route();
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
        const orderBy = sort.split('_').join(' ');

        this.view.render('Costs', Cost.getAll(orderBy));

        this.addNavbarButtonsEventHandler();
        this.addCreateButtonEventHandler();
        this.addUpdateButtonsEventHandler();
        this.addDeleteButtonsEventHandler();
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
        form.elements['date'].value = new Date(cost.date).toISOString().split('T')[0];
        form.elements['category'].value = cost.category.id;
        form.elements['price'].value = cost.price;
        form.elements['description'].value = cost.description;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            cost.changeDate(new Date(formData.get('date')?.toString()));
            cost.changePrice(parseInt(formData.get('price')?.toString()));
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
