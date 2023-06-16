"use strict"

import NavbarView from "../framework/NavbarView";
import FormView from "../framework/FormView";
import Url from "../framework/URL";

export default class CategoryForm {
    constructor() {
        this.body = document.body;
    }

    render(title) {
        const navbarView = new NavbarView();
        const formView = new FormView();
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
        const form = formView.create(
            {
                id: 'form-category',
                name: 'category',
                fields: [
                    {
                        id: 'input-category',
                        name: 'category',
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