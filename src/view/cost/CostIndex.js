"use strict"

import Navbar from "../../framework/view/Navbar";
import Button from "../../framework/view/button/Button";
import Grid from "../../framework/view/Grid";
import Url from "../../framework/URL";

export default class CostIndex {
    constructor() {
        this.body = document.body;
    }

    async render(data) {
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
            (event) => {
                event.preventDefault();
                data.route.redirect(event.target.href);
            },
        );

        window.addButtonOnclickHandler = (event) => {

        }
        const addButton = new Button ({
            text: 'Add cost',
            url: Url.createUrl({action: 'cost/create'}),
            id: 'btn-add',
            class: 'btn btn-primary',
            handler: (event) => {
                event.preventDefault();
                console.log('hi');
                // data.route.redirect(event.target.href);
            }
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
                    },
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