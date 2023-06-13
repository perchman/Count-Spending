"use strict"

export default class CostTable {
    constructor(create, url) {
        this.create = create;
        this.url = url;
        this.body = document.body;
    }

    render(data) {
        console.log(data);
        const navbar = this.create.createNavbar([
            {
                text: 'Cost',
                url: this.url.createUrl({action: 'cost/index'}),
                class: 'nav-link'
            },
            {
                text: 'Category',
                url: this.url.createUrl({action: 'category/index'}),
                class: 'nav-link'
            }
        ]);
        const addButton = this.create.createButton({
            text: 'Add cost',
            url: this.url.createUrl({action: 'cost/create'}),
            id: 'btn-add',
            class: 'btn btn-primary'
        });
        const table = this.create.createTable({
            headers: {
                date: {
                    text: 'Date',
                    sort: true,
                    url: this.url.createUrlSort(),
                    class: 'btn p-0 fw-bold'
                },
                price: {
                    text: 'Price',
                    sort: true,
                    url: this.url.createUrlSort(),
                    class: 'btn p-0 fw-bold'
                },
                description: {
                    text: 'Description',
                    sort: false
                }
            },
            rows: data.forEach((row) => row.date = new Date(row.date).toLocaleDateString()),
            buttons: {
                update: {
                    text: '<i class="bi bi-pencil-fill"></i>',
                    url: (cost) => {
                        return this.url.createUrl({
                            action: 'cost/update',
                            id: cost.id
                        })
                    },
                    class: 'btn btn-update btn-warning px-1 py-0'
                },
                delete: {
                    text: '<i class="bi bi-trash-fill"></i>',
                    url: (cost) => {
                        return this.url.createUrl({
                            action: 'cost/delete',
                            id: cost.id
                        })
                    },
                    class: 'btn btn-update btn-danger px-1 py-0'
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