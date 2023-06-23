"use strict"

import Navbar from "../framework/view/Navbar";
import Button from "../framework/view/Button";
import Grid from "../framework/view/Grid";
import Url from "../framework/URL";

export default class CostTable {
    constructor() {
        this.body = document.body;
    }

    render(data) {
        const navbarView = new Navbar();
        const gridView = new Grid();
        const url = new Url();

        const navbar = navbarView.create([
            {
                text: 'Costs',
                url: url.createUrl({action: 'cost/index'}),
                class: 'nav-link active',
            },
            {
                text: 'Categories',
                url: url.createUrl({action: 'category/index'}),
                class: 'nav-link'
            },
            {
                text: 'Balance',
                url: url.createUrl({action: 'balance/index'}),
                class: 'nav-link'
            }
        ]);
        const button = new Button({
            text: 'Add cost',
            url: url.createUrl({action: 'cost/create'}),
            id: 'btn-add',
            class: 'btn btn-primary'
        });
        const addButton = button.render();
        const grid = gridView.create({
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
                    text: '<i class="bi bi-pencil-fill pe-none"></i>',
                    url: (cost) => {
                        return url.createUrl({
                            action: 'cost/update',
                            id: cost.id
                        })
                    },
                    class: 'btn btn-update btn-warning px-1 py-0'
                },
                delete: {
                    text: '<i class="bi bi-trash-fill pe-none"></i>',
                    url: (cost) => {
                        return url.createUrl({
                            action: 'cost/delete',
                            id: cost.id
                        })
                    },
                    class: 'btn btn-delete btn-danger px-1 py-0'
                }
            }
        });

        this.body.innerHTML = `
            ${navbar}
            <div class="container mt-4">
                <h2>${data.title}</h2>
                <div class="mt-4">
                    ${addButton}  
                    ${grid}
                </div>
            </div>
        `;
    }
}