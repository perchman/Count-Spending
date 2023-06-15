"use strict"

import ButtonView from "./ButtonView";

export default class NavbarView {
    create(params) {
        const buttonView = new ButtonView();

        let buttons = '';
        params.forEach((param) => {
            buttons += `
            <li class="nav-item">
                ${buttonView.create(param)}
            </li>
            `;
        })

        return `
            <nav class="navbar navbar-expand navbar-dark bg-primary">
                <div class="container">
                    <span class="navbar-brand">Count Spending</span>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            ${buttons}
                        </ul>
                    </div>
                </div>
            </nav>
        `;
    }
}