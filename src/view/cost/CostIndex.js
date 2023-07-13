"use strict"

import Navbar from "../../framework/view/Navbar";
import Button from "../../framework/view/button/Button";
import Grid from "../../framework/view/Grid";
import Url from "../../framework/URL";

export default class CostIndex {
    constructor(route) {
        this.route = route;
        this.body = document.body;
    }

    async render(data) {
        const route = this.route;

        const navbar = new Navbar (
            [
                {
                    text: 'Costs',
                    url: Url.createUrl({action: 'cost/index'}),
                    active: true
                },
                {
                    text: 'Categories',
                    url: Url.createUrl({action: 'category/index'})
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

        window.addButtonClickHandler = (event) => {
            event.preventDefault();
            route.redirect(event.target.href);
        };
        const addButton = new Button ({
            text: 'Add cost',
            url: Url.createUrl({action: 'cost/create'}),
            id: 'btn-add',
            class: 'btn btn-primary',
            handler: 'addButtonClickHandler(event)'
        });

        const grid = new Grid ({
            fields: {
                date: {
                    text: 'Date',
                    sort: true,
                    value: (cost) => {
                        return cost.date.toLocaleDateString();
                    }
                },
                category: {
                    text: 'Category',
                    sort: false,
                    value: (cost) => {
                        return cost.getCategoryName();
                    }
                },
                price: {
                    text: 'Price',
                    sort: true,
                    value: (cost) => {
                        return cost.price;
                    }
                },
                description: {
                    text: 'Description',
                    sort: false,
                    value: (cost) => {
                        return cost.description;
                    }
                }
            },
            dataProvider: data.dataProvider,
            buttons: {
                update: {
                    url: (cost) => {
                        return Url.createUrl({
                            action: 'cost/update',
                            id: cost.id
                        })
                    },

                },
                delete: {
                    url: (cost) => {
                        return Url.createUrl({
                            action: 'cost/delete',
                            id: cost.id
                        })
                    }
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
                <h2>${data.title}</h2>
                <div class="mt-4">
                    ${addButton.render()}
                    ${await grid.render()}
                </div>
            </div>
        `;
    }
}