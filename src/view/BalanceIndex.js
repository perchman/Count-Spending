"use strict"

import NavbarView from "../framework/NavbarView";
import ButtonView from "../framework/ButtonView";
import Url from "../framework/URL";

export default class BalanceIndex {
    constructor() {
        this.body = document.body;
    }

    render(value) {
        const navbarView = new NavbarView();
        const buttonView = new ButtonView();
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
        const replenishButton = buttonView.create({
            text: 'Replenish',
            url: url.createUrl({action: 'balance/replenish'}),
            id: 'btn-replenish',
            class: 'btn btn-primary mt-4'
        })


        this.body.innerHTML = `
            ${navbar}
            <div class="container">
                <h2 class="mt-4">Balance</h2>
                <div class="mt-4">
                    <span class="px-2 border border-1 border-primary fs-4">${value}</span>
                </div>
                ${replenishButton}
            </div>
        `;
    }
}