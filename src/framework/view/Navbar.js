"use strict"

import ButtonFactory from "./button/ButtonFactory";
import Route from "../Route";

export default class Navbar {
    constructor(data, eventHandlers) {
        this.data = data;

        for (let handler in eventHandlers) {
            if (!window.hasOwnProperty(handler)) {
                window[handler] = eventHandlers[handler];
            }
        }
    }
    render() {
        const buttonFactory = new ButtonFactory();
        let buttons = '';
        this.data.forEach((item) => {
            if (item.hasOwnProperty('active')) {
                item.class = 'nav-link active';
            }
            const button = buttonFactory.factory('navbar', item);
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