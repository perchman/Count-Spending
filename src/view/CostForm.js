"use strict"

import View from "../framework/View";
import Url from "../framework/URL";

export default class CostForm {
    constructor() {
        this.body = document.body;
    }

    render() {
        const view = new View();
        const url = new Url();

        const navbar = view.createNavbar([
            {
                text: 'Cost',
                url: url.createUrl({action: 'cost/index'}),
                class: 'nav-link active'
            },
            {
                text: 'Category',
                url: url.createUrl({action: 'category/index'}),
                class: 'nav-link'
            }
        ]);
        const form = view.createForm(
            {
                id: 'form-cost',
                name: 'cost',
                fields: [
                    {
                        name: 'date',
                        type: 'date',
                        label: 'Date',
                    },
                    {
                        name: 'price',
                        type: 'number',
                        label: 'Price',
                    },
                    {
                        name: 'description',
                        type: 'text',
                        label: 'Description',
                    }
                ]
            }
        );

        this.body.innerHTML = `
            ${navbar}
            <div class="container mt-4">
                ${form}  
            </div>
        `;
    }
}