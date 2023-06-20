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
        const sort = url.searchParams.get('sort') || 'id_desc';
        const orderBy = sort.split('_').join(' ');

        this.view.render('Categories', Category.getAll(orderBy));

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

            try {
                const category = Category.create(formData.get('name')?.toString());
            } catch (error) {
                alert(error);
            }


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