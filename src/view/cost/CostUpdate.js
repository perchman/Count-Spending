"use strict"

import Navbar from "../../framework/view/Navbar";
import Url from "../../framework/URL";
import DateField from "../../framework/view/form/fields/DateField";
import DropdownField from "../../framework/view/form/fields/DropdownField";
import NumberField from "../../framework/view/form/fields/NumberField";
import TextField from "../../framework/view/form/fields/TextField";
import FormButton from "../../framework/view/form/fields/FormButton";

export default class CostCreate {
    constructor(route) {
        this.route = route;
        this.body = document.body;
    }

    async render(data) {
        const navbar = new Navbar (
            [
                {
                    text: 'Costs',
                    url: Url.createUrl({action: 'cost/index'}),
                    active: true
                },
                {
                    text: 'Categories',
                    url: Url.createUrl({action: 'category/index'})
                },
                {
                    text: 'Balance',
                    url: Url.createUrl({action: 'balance/index'})
                }
            ],
            {
                navbarClickHandler: (event) => {
                    event.preventDefault();
                    this.route.redirect(event.target.href);
                }
            }
        );

        const form = data.form;
        const fields = await form.getFields();
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