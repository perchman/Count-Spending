"use strict"

import Navbar from "../framework/view/Navbar";
import Form from "../framework/view/Form";
import Url from "../framework/URL";

export default class CategoryForm {
    constructor() {
        this.body = document.body;
    }

    render(title) {
        const navbarView = new Navbar();
        const formView = new Form();
        const url = new Url();

        const navbar = navbarView.create([
            {
                text: 'Costs',
                url: url.createUrl({action: 'cost/index'}),
                class: 'nav-link'
            },
            {
                text: 'Categories',
                url: url.createUrl({action: 'category/index'}),
                class: 'nav-link active'
            },
            {
                text: 'Balance',
                url: url.createUrl({action: 'balance/index'}),
                class: 'nav-link'
            }
        ]);
        const form = formView.create(
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
            ${navbar}
            <div class="container mt-4">
                <h2>${title}</h2>
                ${form}  
            </div>
        `;
    }
}