"use strict"

import Navbar from "../../framework/view/Navbar";
import Button from "../../framework/view/button/Button";
import Grid from "../../framework/view/Grid";
import Url from "../../framework/URL";

export default class CategoryIndex {
    constructor(route) {
        this.route = route;
        this.body = document.body;
    }

    async render(data) {
        const route = this.route;

        const navbar = new Navbar(
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
            ],
            {
                navbarClickHandler: (event) => {
                    event.preventDefault();
                    route.redirect(event.target.href);
                }
            }
        );

        if (!window.hasOwnProperty('addButtonClickHandler')) {
            window.addButtonClickHandler = (event) => {
                event.preventDefault();
                route.redirect(event.target.href);
            };
        }
        const addButton = new Button({
            text: 'Add category',
            url: Url.createUrl({action: 'category/create'}),
            id: 'btn-add',
            class: 'btn btn-primary',
            handler: 'addButtonClickHandler(event)'
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
            eventHandlers: {
                sortClickHandler: (event) => {
                    event.preventDefault();
                    route.redirect(event.target.href);
                },
                updateClickHandler: (event) => {
                    event.preventDefault();
                    route.redirect(event.target.href);
                },
                deleteClickHandler: (event) => {
                    event.preventDefault();
                    route.redirect(event.target.href);
                },
                paginationClickHandler: (event) => {
                    event.preventDefault();
                    route.redirect(event.target.href);
                }
            }
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