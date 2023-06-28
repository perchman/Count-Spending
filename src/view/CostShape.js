"use strict"

import Navbar from "../framework/view/Navbar";
import CostForm from "../framework/view/form/CostForm";
import Url from "../framework/URL";

export default class CostShape {
    constructor() {
        this.body = document.body;
    }

    render(data) {
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
        // const form = new Form (
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

        // const form = new Form('cost');
        // const dateField = new DateField({
        //     name: 'date',
        //     label: 'Date',
        //     // value: data.cost.date
        // });
        // const categoryField = new DropdownField({
        //     name: 'category',
        //     label: 'Category',
        //     data: data.categories,
        //     // value: data.cost.category.name,
        //     disabledOption: 'Select a category',
        // });
        // const priceField = new NumberField({
        //     name: 'price',
        //     label: 'Price',
        //     // value: data.cost.price
        // })
        // const descriptionField = new TextField({
        //     name: 'description',
        //     label: 'Description',
        //     // value: data.cost.description
        // })
        // const saveButton = new FormButton('Save');

        this.body.innerHTML = `
            ${navbar.render()}
            <div class="container mt-4">
                <h2>${data.title}</h2>
                ${data.form.render()}
            </div>
        `;
    }
}