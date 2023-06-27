"use strict"

import Navbar from "../framework/view/Navbar";
import Form from "../framework/view/Form";
import Url from "../framework/URL";

export default class CostForm {
    constructor() {
        this.body = document.body;
    }

    render(title, categories) {
        const url = new Url();

        const navbar = new Navbar ([
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
        const form = new Form (
            {
                id: 'form-cost',
                name: 'cost',
                fields: [
                    {
                        tag: 'select',
                        disabledOption: 'Select a category',
                        id: 'select-category',
                        name: 'category',
                        options: categories
                    },
                    {
                        tag: 'input',
                        id: 'input-date',
                        name: 'date',
                        type: 'date',
                        label: 'Date',
                    },
                    {
                        tag: 'input',
                        id: 'input-price',
                        name: 'price',
                        type: 'number',
                        label: 'Price',
                    },
                    {
                        tag: 'input',
                        id: 'input-description',
                        name: 'description',
                        type: 'text',
                        label: 'Description',
                    }
                ],
                buttonText: 'Save'
            }
        );

        this.body.innerHTML = `
            ${navbar.render()}
            <div class="container mt-4">
                <h2>${title}</h2>
                ${form.render()}  
            </div>
        `;
    }
}