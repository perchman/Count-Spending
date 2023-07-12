"use strict"

import Navbar from "../../framework/view/Navbar";
import Button from "../../framework/view/button/Button";
import Grid from "../../framework/view/Grid";
import Url from "../../framework/URL";
import IndexedDBActiveRecordModel from "../../framework/IndexedDBActiveRecordModel";

export default class CategoryIndex {
    constructor() {
        this.body = document.body;
    }

    async render(data) {
        const navbar = new Navbar(
            data.route,
            [
                {
                    text: 'Costs',
                    url: Url.createUrl({action: 'cost/index'})
                },
                {
                    text: 'Categories',
                    url: Url.createUrl({action: 'category/index'}),
                    active: true
                },
                {
                    text: 'Balance',
                    url: Url.createUrl({action: 'balance/index'})
                }
            ]
        );
        const addButton = new Button({
            text: 'Add category',
            url: Url.createUrl({action: 'category/create'}),
            id: 'btn-add',
            class: 'btn btn-primary'
        });
        const grid = new Grid({
            fields: {
                id: {
                    text: 'Id',
                    sort: true,
                    class: 'btn p-0 fw-bold',
                    value: (category) => {
                        return category.id
                    }
                },
                name: {
                    text: 'Category',
                    sort: false,
                    value: (category) => {
                        return category.name
                    }
                }
            },
            dataProvider: data.dataProvider,
            buttons: {
                update: {
                    text: '<i class="bi bi-pencil-fill pe-none"></i>',
                    url: (category) => {
                        return Url.createUrl({
                            action: 'category/update',
                            id: category.id
                        })
                    },
                    class: 'btn btn-update btn-warning px-1 py-0'
                },
                delete: {
                    text: '<i class="bi bi-trash-fill pe-none"></i>',
                    url: (category) => {
                        return Url.createUrl({
                            action: 'category/delete',
                            id: category.id
                        })
                    },
                    class: 'btn btn-delete btn-danger px-1 py-0'
                }
            },
        });

        this.body.innerHTML = `
            ${navbar.render()}
            <div class="container mt-4">
                <h2 class="">${data.title}</h2>
                <div class="mt-4">
                    ${addButton.render()}  
                    ${await grid.render()}
                </div>
            </div>
        `;
    }
}