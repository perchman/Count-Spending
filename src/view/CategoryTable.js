"use strict"

import NavbarView from "../framework/NavbarView";
import ButtonView from "../framework/ButtonView";
import GridView from "../framework/GridView";
import Url from "../framework/URL";

export default class CategoryTable {
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
                class: 'nav-link'
            },
            {
                text: 'Category',
                url: url.createUrl({action: 'category/index'}),
                class: 'nav-link active'
            },
            {
                text: 'Balance',
                url: url.createUrl({action: 'balance/index'}),
                class: 'nav-link'
            }
        ]);
        const addButton = buttonView.create({
            text: 'Add category',
            url: url.createUrl({action: 'category/create'}),
            id: 'btn-add',
            class: 'btn btn-primary'
        });
        const table = gridView.createTable({
            headers: {
                id: {
                    text: 'Id',
                    sort: true,
                    url: url.createUrlSort(),
                    class: 'btn p-0 fw-bold'
                },
                category: {
                    text: 'Category',
                    sort: false
                }
            },
            rows: data,
            buttons: {
                update: {
                    text: '<i class="bi bi-pencil-fill pe-none"></i>',
                    url: (category) => {
                        return url.createUrl({
                            action: 'category/update',
                            id: category.id
                        })
                    },
                    class: 'btn btn-update btn-warning px-1 py-0'
                },
                delete: {
                    text: '<i class="bi bi-trash-fill pe-none"></i>',
                    url: (category) => {
                        return url.createUrl({
                            action: 'category/delete',
                            id: category.id
                        })
                    },
                    class: 'btn btn-delete btn-danger px-1 py-0'
                }
            }
        });

        this.body.innerHTML = `
            ${navbar}
            <div class="container mt-4">
                <h2 class="">${title}</h2>
                <div class="mt-4">
                    ${addButton}  
                    ${table}
                </div>
            </div>
        `;
    }
}