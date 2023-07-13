"use strict"

import Navbar from "../../framework/view/Navbar";
import Url from "../../framework/URL";
import TextField from "../../framework/view/form/fields/TextField";
import FormButton from "../../framework/view/form/fields/FormButton";

export default class CategoryCreate {
    constructor(route) {
        this.route = route;
        this.body = document.body;
    }

    render(data) {
        const navbar = new Navbar (
            [
                {
                    text: 'Costs',
                    url: Url.createUrl({action: 'cost/index'})
                },
                {
                    text: 'Categories',
                    url: Url.createUrl({action: 'category/index'}),
                    active: true
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
        const fields = form.getFields();
        const categoryNameField = new TextField(form, fields.categoryName);
        const saveButton = new FormButton(form, 'Save');

        this.body.innerHTML = `
            ${navbar.render()}
            <div class="container mt-4">
                <h2>${data.title}</h2>
                ${form.before()}
                    ${categoryNameField.render()}
                    ${saveButton.render()}
                ${form.end()}  
            </div>
        `;
    }
}