"use strict"

import Navbar from "../../framework/view/Navbar";
import Url from "../../framework/URL";
import DateField from "../../framework/view/form/fields/DateField";
import DropdownField from "../../framework/view/form/fields/DropdownField";
import NumberField from "../../framework/view/form/fields/NumberField";
import TextField from "../../framework/view/form/fields/TextField";
import FormButton from "../../framework/view/form/fields/FormButton";

export default class CostCreate {
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

        const form = data.form;
        const fields = form.getFields();
        const dateField = new DateField(form, fields.date);
        const categoryField = new DropdownField(form, fields.category);
        const priceField = new NumberField(form, fields.price);
        const descriptionField = new TextField(form, fields.description);
        const saveButton = new FormButton(form, 'Save');

        this.body.innerHTML = `
            ${navbar.render()}
            <div class="container mt-4">
                <h2>${data.title}</h2>
                ${form.before()}
                    ${dateField.render()}
                    ${categoryField.render()}
                    ${priceField.render()}
                    ${descriptionField.render()}
                    ${saveButton.render()}
                ${form.end()}
            </div>
        `;
    }
}