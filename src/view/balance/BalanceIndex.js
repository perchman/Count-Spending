"use strict"

import Navbar from "../../framework/view/Navbar";
import Button from "../../framework/view/button/Button";
import Url from "../../framework/URL";

export default class BalanceIndex {
    constructor(route) {
        this.route = route;
        this.body = document.body;
    }

    async render(balance) {
        const navbar = new Navbar (
            [
                {
                    text: 'Costs',
                    url: Url.createUrl({action: 'cost/index'}),
                },
                {
                    text: 'Categories',
                    url: Url.createUrl({action: 'category/index'}),
                },
                {
                    text: 'Balance',
                    url: Url.createUrl({action: 'balance/index'}),
                    active: true
                }
            ],
            {
                navbarClickHandler: (event) => {
                    event.preventDefault();
                    this.route.redirect(event.target.href);
                }
            }
        );

        window.replenishClickHandler = (event) => {
            event.preventDefault();
            this.route.redirect(event.target.href);
        }
        const replenishButton = new Button({
            text: 'Replenish',
            url: Url.createUrl({action: 'balance/replenish'}),
            id: 'btn-replenish',
            class: 'btn btn-primary mt-4',
            handler: 'replenishClickHandler(event)'
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