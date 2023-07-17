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

    redirect(action) {
        this.route.redirect(Url.createUrl(action));
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
    }

    async create() {
        const form = new CategoryForm();

        this.view.render({
            title: 'Create category',
            form: form
        });

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

        await form.onSuccessSubmit(async (data) => {
            category.name = data.categoryName;
            await category.save();

            this.redirect({action: 'category/index'});
        })
    }

    async delete() {
        const url = new URL(window.location.href);
        const id = parseInt(url.searchParams.get('id'));
        const category = await Category.getById(id);

        let data = {
            title: 'Success!',
            class: 'alert-success',
            text: 'Category #' + category.id + ' removed.'
        };

        try {
            await category.delete();
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