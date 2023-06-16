"use strict"

import NavbarView from "../framework/NavbarView";
import FormView from "../framework/FormView";
import Url from "../framework/URL";

export default class BalanceReplenish {
    constructor() {
        this.body = document.body;
    }

    render() {
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
                class: 'nav-link'
            },
            {
                text: 'Balance',
                url: url.createUrl({action: 'balance/index'}),
                class: 'nav-link active'
            }
        ]);
        const form = formView.create({
            id: 'form-balance',
            name: 'balance',
            fields: [
                {
                    id: 'input-replenish',
                    name: 'replenish',
                    type: 'number',
                    label: 'Amount',
                }
            ],
            buttonText: 'Add'
        })

        this.body.innerHTML = `
            ${navbar}
            <div class="container mt-4">
                <h2>Replenish balance</h2>
                ${form}
            </div>
        `;
    }
}