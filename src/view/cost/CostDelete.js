"use strict"

import Navbar from "../../framework/view/Navbar";
import Url from "../../framework/URL";
import Button from "../../framework/view/button/Button";

export default class CostDelete {
    constructor(route) {
        this.route = route;
        this.body = document.body;
    }

    render(data) {
        const navbar = new Navbar(
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

        if (!window.hasOwnProperty('goBack')) {
            window.goBack = (event) => {
                event.preventDefault();
                window.history.back();
            };
        }
        const backButton = new Button({
            text: 'Back',
            id: 'btn-back',
            class: 'btn btn-primary',
            handler: 'goBack(event)'
        });

        this.body.innerHTML = `
            ${navbar.render()}
            <div class="container mt-4">
                <h2 class="">${data.title}</h2>
                <div class="mt-4">
                    <div class="alert ${data.class}" role="alert">
                        ${data.text}
                    </div>
                    ${backButton.render()}  
                </div>
            </div>
        `;
    }
}