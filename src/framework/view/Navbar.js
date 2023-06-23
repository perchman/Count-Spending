"use strict"

import Button from "./Button";

export default class Navbar {
    create(params) {
        const buttonView = new Button();

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