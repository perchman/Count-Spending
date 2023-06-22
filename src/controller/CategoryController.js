"use strict"

import Category from "../model/Category";
import Url from "../framework/URL";

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

    redirect(action) {
        const url = new Url();

        window.addEventListener('popstate', (e) => this.route.routing());
        window.history.pushState({}, "", url.createUrl(action));
        window.dispatchEvent(new Event('popstate'));
    }

    index() {
        const url = new URL(window.location.href);
        const sort = url.searchParams.get('sort') || 'id_desc';
        const orderBy = sort.split('_').join(' ');

        const gridViewConfig = {
            sort: {
                defaultOrder: {
                    date: 'desc'
                }
            },
            pagination: {
                pageSize: 10
            },
            model: Category,
            title: 'Categories',
        }

        this.view.render(gridViewConfig);

        this.addNavbarButtonsEventHandler();
        this.addCreateButtonEventHandler();
        this.addUpdateButtonsEventHandler();
        this.addDeleteButtonsEventHandler();
    }

    create() {
        this.view.render('Create category');
        this.addNavbarButtonsEventHandler();

        const form = document.getElementById('form-category');
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const category = Category.create(formData.get('name')?.toString());

            this.redirect({action: 'category/index'});
        })
    }

    update() {
        this.view.render('Update category');
        this.addNavbarButtonsEventHandler();

        const url = new URL(window.location.href);
        const id = url.searchParams.get('id');
        let category = Category.getById(id);

        const form = document.getElementById('form-category');
        form.elements['name'].value = category.name;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            category.changeName(formData.get('name')?.toString());
            category.save();

            this.redirect({action: 'category/index'});
        })
    }

    delete(id) {
        const category = Category.getById(id);
        try {
            category.delete();
        } catch (error) {
            alert(error);
        }
    }
}