"use strict"

import Navbar from "../../framework/view/Navbar";
import Button from "../../framework/view/button/Button";
import Url from "../../framework/URL";

export default class BalanceIndex {
    constructor() {
        this.body = document.body;
    }

    async render(balance) {
        const url = new Url();

        const navbar = new Navbar ([
            {
                text: 'Costs',
                url: url.createUrl({action: 'cost/index'}),
            },
            {
                text: 'Categories',
                url: url.createUrl({action: 'category/index'}),
            },
            {
                text: 'Balance',
                url: url.createUrl({action: 'balance/index'}),
                active: true
            }
        ]);
        const replenishButton = new Button({
            text: 'Replenish',
            url: url.createUrl({action: 'balance/replenish'}),
            id: 'btn-replenish',
            class: 'btn btn-primary mt-4'
        });


        this.body.innerHTML = `
            ${navbar.render()}
            <div class="container">
                <h2 class="mt-4">Balance</h2>
                <div class="mt-4">
                    <span class="px-2 border border-1 border-primary fs-4">${await balance.getValue()}</span>
                </div>
                ${replenishButton.render()}
            </div>
        `;
    }
}