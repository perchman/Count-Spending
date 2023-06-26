"use strict"

import Navbar from "../framework/view/Navbar";
import Button from "../framework/view/button/Button";
import Grid from "../framework/view/Grid";
import Url from "../framework/URL";

export default class CostTable {
    constructor() {
        this.body = document.body;
    }

    render(data) {
        const navbarView = new Navbar();
        const url = new Url();

        const navbar = navbarView.create([
            {
                text: 'Costs',
                url: url.createUrl({action: 'cost/index'}),
                active: true
            },
            {
                text: 'Categories',
                url: url.createUrl({action: 'category/index'})
            },
            {
                text: 'Balance',
                url: url.createUrl({action: 'balance/index'})
            }
        ]);
        const addButton = new Button({
            text: 'Add cost',
            url: url.createUrl({action: 'cost/create'}),
            id: 'btn-add',
            class: 'btn btn-primary'
        });
        const grid = new Grid({
            fields: {
                date: {
                    text: 'Date',
                    sort: true,
                    url: url.createUrlSort(),
                    class: 'btn p-0 fw-bold',
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
                    url: url.createUrlSort(),
                    class: 'btn p-0 fw-bold',
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
                        return url.createUrl({
                            action: 'cost/update',
                            id: cost.id
                        })
                    },
                },
                delete: {
                    url: (cost) => {
                        return url.createUrl({
                            action: 'cost/delete',
                            id: cost.id
                        })
                    },
                }
            }
        });

        this.body.innerHTML = `
            ${navbar}
            <div class="container mt-4">
                <h2>${data.title}</h2>
                <div class="mt-4">
                    ${addButton.render()}  
                    ${grid.render()}
                </div>
            </div>
        `;
    }
}