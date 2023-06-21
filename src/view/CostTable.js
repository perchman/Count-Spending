"use strict"

import NavbarView from "../framework/NavbarView";
import ButtonView from "../framework/ButtonView";
import GridView from "../framework/GridView";
import PaginationView from "../framework/PaginationView";
import Url from "../framework/URL";

export default class CostTable {
    constructor() {
        this.body = document.body;
    }

    render(params) {
        const navbarView = new NavbarView();
        const buttonView = new ButtonView();
        const gridView = new GridView();
        const paginationView = new PaginationView();
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
        const addButton = buttonView.create({
            text: 'Add cost',
            url: url.createUrl({action: 'cost/create'}),
            id: 'btn-add',
            class: 'btn btn-primary'
        });
        const table = gridView.create({
            headers: {
                date: {
                    text: 'Date',
                    sort: true,
                    url: url.createUrlSort(),
                    class: 'btn p-0 fw-bold'
                },
                categoryName: {
                    text: 'Category',
                    sort: false
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
            rows: params.data.splice(params.firstElem, params.lastElem).map((cost) => {
                return {
                    id: cost.id,
                    date: cost.date.toLocaleDateString(),
                    price: cost.price,
                    description: cost.description,
                    categoryName: cost.getCategoryName(),
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
        const pagination = paginationView.create({
            id: 'pagination-cost',
            firstElem: params.firstElem + 1,
            lastElem: params.lastElem,
            quantityAll: params.quantityAll,
            quantityInPage: params.quantityInPage,
            buttons: {
                prevButton: {
                    text: 'Previous',
                    url: url.createUrlPagination({
                        pageNum: params.pageNum - 1,
                        quantityAll: params.quantityAll,
                        quantityInPage: params.quantityInPage
                    }),
                    class: 'btn btn-pagination table-link border btn-outline-secondary'
                },
                pageButton: {
                    url: (num) => {
                        return url.createUrlPagination({
                            pageNum: num,
                            quantityAll: params.quantityAll,
                            quantityInPage: params.quantityInPage
                        });
                    },
                    class: 'btn btn-pagination table-link border btn-outline-secondary'
                },
                nextButton: {
                    text: 'Next',
                    url: url.createUrlPagination({
                        pageNum: params.pageNum + 1,
                        quantityAllElems: params.quantityAll,
                        quantityElemsInPage: params.quantityInPage
                    }),
                    class: 'btn btn-pagination table-link border btn-outline-secondary'
                }
            }
        });

        this.body.innerHTML = `
            ${navbar}
            <div class="container mt-4">
                <h2>${params.title}</h2>
                <div class="mt-4">
                    ${addButton}  
                    ${table}
                    ${pagination}
                </div>
            </div>
        `;
    }
}