"use strict"

import Button from "./Button";

export default class Navbar {
    create(data) {
        let buttons = '';
        data.forEach((item) => {
            const button = new Button(item);
            buttons += `
            <li class="nav-item">
                ${button.render()}
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