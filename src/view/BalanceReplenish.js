"use strict"

import Navbar from "../framework/view/Navbar";
import Form from "../framework/view/Form";
import Url from "../framework/URL";

export default class BalanceReplenish {
    constructor() {
        this.body = document.body;
    }

    render() {
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
                    tag: 'input',
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