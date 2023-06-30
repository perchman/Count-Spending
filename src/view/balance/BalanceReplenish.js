"use strict"

import Navbar from "../../framework/view/Navbar";
import Url from "../../framework/URL";
import NumberField from "../../framework/view/form/fields/NumberField";
import FormButton from "../../framework/view/form/fields/FormButton";

export default class BalanceReplenish {
    constructor() {
        this.body = document.body;
    }

    render(data) {
        const url = new Url();

        const navbar = new Navbar ([
            {
                text: 'Costs',
                url: url.createUrl({action: 'cost/index'})
            },
            {
                text: 'Categories',
                url: url.createUrl({action: 'category/index'})
            },
            {
                text: 'Balance',
                url: url.createUrl({action: 'balance/index'}),
                active: true
            }
        ]);

        const form = data.form;
        const fields = form.getFields();
        const replenishField = new NumberField(form, fields.replenish);
        const replenishButton = new FormButton(form, 'Add');

        this.body.innerHTML = `
            ${navbar.render()}
            <div class="container mt-4">
                <h2>${data.title}</h2>
                ${form.before()}
                    ${replenishField.render()}
                    ${replenishButton.render()}
                ${form.end()}
            </div>
        `;
    }
}