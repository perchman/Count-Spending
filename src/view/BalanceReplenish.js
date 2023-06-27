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

        const navbar = navbarView.render([
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
        const form = formView.render({
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