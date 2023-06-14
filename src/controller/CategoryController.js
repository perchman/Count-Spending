"use strict"

import Category from "../model/Category";
import Url from "../framework/URL";
import Cost from "../model/Cost";

export default class CategoryController {
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

        this.view.render(Category.getCategoriesArray());
        this.addNavbarButtonsEventHandler();
        this.addCreateButtonEventHandler();
        this.addUpdateButtonsEventHandler();
        this.addDeleteButtonsEventHandler();
    }

    create() {
        this.view.render();
        this.addNavbarButtonsEventHandler();

        const form = document.getElementById('form-category');
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            const category = Category.create(formData.get('category')?.toString());

            category.save();

            this.redirect({action: 'category/index'});
        })
    }

    update() {
        this.view.render();
        this.addNavbarButtonsEventHandler();

        const url = new URL(window.location.href);
        const id = url.searchParams.get('id');
        let category = Category.getById(id);

        const form = document.getElementById('form-category');
        form.elements['category'].value = category.category;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            category.changeCategory(formData.get('category')?.toString());
            category.save();

            this.redirect({action: 'category/index'});
        })
    }

    delete(id) {
        const category = Category.getById(id);
        category.delete();
    }
}