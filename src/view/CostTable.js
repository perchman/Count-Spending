"use strict"

import NavbarView from "../framework/NavbarView";
import ButtonView from "../framework/ButtonView";
import GridView from "../framework/GridView";
import Url from "../framework/URL";

export default class CostTable {
    constructor() {
        this.body = document.body;
    }

    render(title, data) {
        const navbarView = new NavbarView();
        const buttonView = new ButtonView();
        const gridView = new GridView();
        const url = new Url();

        const navbar = navbarView.create([
            {
                text: 'Cost',
                url: url.createUrl({action: 'cost/index'}),
                class: 'nav-link active',
            },
            {
                text: 'Category',
                url: url.createUrl({action: 'category/index'}),
                class: 'nav-link'
            },
            {
                text: 'Balance',
                url: url.createUrl({action: 'balance/index'}),
                class: 'nav-link'
            }
        ]);
        const addButton = buttonView.create({
            text: 'Add cost',
            url: url.createUrl({action: 'cost/create'}),
            id: 'btn-add',
            class: 'btn btn-primary'
        });
        const table = gridView.createTable({
            headers: {
                date: {
                    text: 'Date',
                    sort: true,
                    url: url.createUrlSort(),
                    class: 'btn p-0 fw-bold'
                },
                price: {
                    text: 'Price',
                    sort: true,
                    url: url.createUrlSort(),
                    class: 'btn p-0 fw-bold'
                },
                description: {
                    text: 'Description',
                    sort: false
                }
            },
            rows: data.map((cost) => {
                return {
                    id: cost.id,
                    date: new Date(cost.date).toLocaleDateString(),
                    price: cost.price,
                    description: cost.description
                }
            }),
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
                <h2>${title}</h2>
                <div class="mt-4">
                    ${addButton}  
                    ${table}
                </div>
            </div>
        `;
    }
}