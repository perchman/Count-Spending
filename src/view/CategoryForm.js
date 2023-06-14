"use strict"

import View from "../framework/View";
import Url from "../framework/URL";

export default class CategoryForm {
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
                class: 'nav-link'
            },
            {
                text: 'Category',
                url: url.createUrl({action: 'category/index'}),
                class: 'nav-link active'
            }
        ]);
        const form = view.createForm(
            {
                id: 'form-category',
                name: 'category',
                fields: [
                    {
                        name: 'category',
                        type: 'text',
                        label: 'Category',
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