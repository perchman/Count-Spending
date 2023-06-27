"use strict"

import Navbar from "../framework/view/Navbar";
import Form from "../framework/view/Form";
import Url from "../framework/URL";

export default class BalanceReplenish {
    constructor() {
        this.body = document.body;
    }

    render() {
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
        const form = new Form ({
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
            ${navbar.render()}
            <div class="container mt-4">
                <h2>Replenish balance</h2>
                ${form.render()}
            </div>
        `;
    }
}