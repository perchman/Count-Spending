"use strict"

import View from "../framework/View";
import Url from "../framework/URL";

export default class CategoryTable {
    constructor() {
        this.body = document.body;
    }

    render(data) {
        const view = new View();
        const url = new Url();

        const navbar = view.createNavbar([
            {
                text: 'Cost',
                url: url.createUrl({action: 'cost/index'}),
                class: 'nav-link'
            },
            {
                text: 'Category',
                url: url.createUrl({action: 'category/index'}),
                class: 'nav-link  active'
            }
        ]);
        const addButton = view.createButton({
            text: 'Add category',
            url: url.createUrl({action: 'category/create'}),
            id: 'btn-add',
            class: 'btn btn-primary'
        });
        const table = view.createTable({
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
                ${addButton}  
                ${table}
            </div>
        `;
    }
}