"use strict"

import Grid from "../../framework/view/Grid";
import Navbar from "../../framework/view/Navbar";
import Url from "../../framework/URL";
import Button from "../../framework/view/button/Button";

export default class BalanceHistory {
    constructor(route) {
        this.route = route;
        this.body = document.body;
    }

    async render(data) {
        const navbar = new Navbar(
            [
                {
                    text: 'Costs',
                    url: Url.createUrl({action: 'cost/index'})
                },
                {
                    text: 'Categories',
                    url: Url.createUrl({action: 'category/index'})
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

        const grid = new Grid({
            fields: {
                id: {
                    text: 'Id',
                    sort: true,
                    value: (historyBalanceChange) => {
                        return historyBalanceChange.id;
                    }
                },
                date: {
                    text: 'Date',
                    sort: true,
                    value: (historyBalanceChange) => {
                        return historyBalanceChange.date.toLocaleDateString();
                    }
                },
                type: {
                    text: 'Type',
                    sort: false,
                    value: (historyBalanceChange) => {
                        return historyBalanceChange.type;
                    }
                },
                amount: {
                    text: 'Amount',
                    sort: true,
                    value: (historyBalanceChange) => {
                        return historyBalanceChange.amount;
                    }
                }
            },
            dataProvider: data.dataProvider,
            buttons: {
                delete: {
                    url: (historyBalanceChange) => {
                        return Url.createUrl({
                            action: 'history/delete',
                            id: historyBalanceChange.id
                        })
                    }
                }
            },
            eventHandlers: {
                sortClickHandler: (event) => {
                    event.preventDefault();
                    this.route.redirect(event.target.href);
                },
                deleteClickHandler: (event) => {
                    event.preventDefault();
                    this.route.redirect(event.target.href);
                },
                paginationClickHandler: (event) => {
                    event.preventDefault();
                    this.route.redirect(event.target.href);
                }
            }
        });

        this.body.innerHTML = `
            ${navbar.render()}
            <div class="container mt-4">
                <h2>${data.title}</h2>
                <div class="mt-4">
                    ${backButton.render()}
                    ${await grid.render()}
                </div>
            </div>
        `;
    }
}