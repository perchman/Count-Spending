"use strict"

import Navbar from "../framework/view/Navbar";
import Form from "../framework/view/Form";
import Url from "../framework/URL";

export default class CostForm {
    constructor() {
        this.body = document.body;
    }

    render(title, categories) {
        const navbarView = new Navbar();
        const formView = new Form();
        const url = new Url();

        const navbar = navbarView.create([
            {
                text: 'Costs',
                url: url.createUrl({action: 'cost/index'}),
                class: 'nav-link active'
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
        const form = formView.create(
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
            ${navbar}
            <div class="container mt-4">
                <h2>${title}</h2>
                ${form}  
            </div>
        `;
    }
}