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
        // const form = new FormHandler (
        //     {
        //         id: 'form-cost',
        //         name: 'cost',
        //         fields: [
        //             {
        //                 tag: 'select',
        //                 disabledOption: 'Select a category',
        //                 id: 'select-category',
        //                 name: 'category',
        //                 options: categories,
        //             },
        //             {
        //                 tag: 'input',
        //                 id: 'input-date',
        //                 name: 'date',
        //                 type: 'date',
        //                 label: 'Date',
        //                 validators: ['required']
        //             },
        //             {
        //                 tag: 'input',
        //                 id: 'input-price',
        //                 name: 'price',
        //                 type: 'number',
        //                 label: 'Price',
        //             },
        //             {
        //                 tag: 'textarea',
        //                 id: 'input-description',
        //                 name: 'description',
        //                 type: 'text',
        //                 label: 'Description',
        //             }
        //         ],
        //         buttonText: 'Save'
        //     }
        // );

        const form = new FormView(name);
        const categoryField = new DropdownField({
            name: 'category',
            label: 'Category',
            // value: 1
            data: categories,
            disabledOption: 'Select a category',
        });
        const dateField = new DateField({
            name: 'date',
            label: 'Date',
            value: value,
        });

        /*
        this.body.innerHTML = `
            ${navbar.render()}
            <div class="container mt-4">
                <h2>${title}</h2>
                ${form.render()}  
            </div>
        `;

         */

        this.body.innerHTML = `
            ${navbar.render()}
            <div class="container mt-4">
                <h2>${title}</h2>
                ${form.begin()}
                    ${categoryField.render()}
                    ${dateField.render()}
                ${form.end()}
            </div>
        `;
    }
}