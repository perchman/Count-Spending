"use strict"

import Category from "../model/Category";
import Url from "../framework/URL";
import DataProvider from "../framework/DataProvider";
import CategoryForm from "../forms/CategoryForm";

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
        const url = new Url();

        window.addEventListener('popstate', (e) => this.route.routing());
        window.history.pushState({}, "", url.createUrl(action));
        window.dispatchEvent(new Event('popstate'));
    }

    async index() {
        const url = new URL(window.location.href);
        const sort = url.searchParams.get('sort') || 'id_desc';

        const dataProvider = new DataProvider({
            sort: {
                defaultOrder: 'id desc',
                orderBy: sort
            },
            model: Category,
            pagination: {
                pageSize: 5
            }
        });

        await this.view.render({
            title: 'Categories',
            dataProvider: dataProvider
        });

        this.addNavbarButtonsEventHandler();
        this.addCreateButtonEventHandler();
        this.addSortButtonsEventHandler();
        this.addUpdateButtonsEventHandler();
        this.addDeleteButtonsEventHandler();
        this.addPaginationButtonsEventHandler();
    }

    async create() {
        const form = new CategoryForm();

        this.view.render({
            title: 'Create category',
            form: form
        });

        this.addNavbarButtonsEventHandler();

        await form.onSuccessSubmit(async (data) => {
            await Category.create(data.categoryName);
            this.redirect({action: 'category/index'});
        })
    }

    async update() {
        const url = new URL(window.location.href);
        const id = parseInt(url.searchParams.get('id'));
        let category = await Category.getById(id);

        const form = new CategoryForm(category);

        this.view.render({
            title: 'Update category',
            form: form
        });

        this.addNavbarButtonsEventHandler();

        await form.onSuccessSubmit(async (data) => {
            category.name = data.categoryName;
            console.log(category, data);
            await category.save();

            this.redirect({action: 'category/index'});
        })
    }

    async delete(id) {
        const category = await Category.getById(id);
        try {
            await category.delete();
        } catch (error) {
            alert(error);
        }
    }
}