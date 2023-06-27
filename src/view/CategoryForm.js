"use strict"

import Navbar from "../framework/view/Navbar";
import Form from "../framework/view/Form";
import Url from "../framework/URL";

export default class CategoryForm {
    constructor() {
        this.body = document.body;
    }

    render(title) {
        const url = new Url();

        const navbar = new Navbar ([
            {
                text: 'Costs',
                url: url.createUrl({action: 'cost/index'})
            },
            {
                text: 'Categories',
                url: url.createUrl({action: 'category/index'}),
                active: true
            },
            {
                text: 'Balance',
                url: url.createUrl({action: 'balance/index'})
            }
        ]);
        const form = new Form (
            {
                id: 'form-category',
                name: 'category',
                fields: [
                    {
                        tag: 'input',
                        id: 'input-category',
                        name: 'name',
                        type: 'text',
                        label: 'Category',
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