"use strict"

import Button from "./Button";

export default class ButtonFactory {
    factory(type, params) {
        const types = {
            navbar: {
                class: 'nav-link',
                handler: 'navbarClickHandler(event)'
            },
            sort: {
                class: 'btn btn-sort p-0 fw-bold',
                handler: 'sortClickHandler(event)'
            },
            update: {
                text: '<i class="bi bi-pencil-fill pe-none"></i>',
                class: 'btn btn-update btn-warning px-1 py-0 ms-1',
                handler: 'updateClickHandler(event)'
            },
            delete: {
                text: '<i class="bi bi-trash-fill pe-none"></i>',
                class: 'btn btn-delete btn-danger px-1 py-0 ms-1',
                handler: 'deleteClickHandler(event)'
            },
            pagination: {
                class: 'btn btn-pagination border btn-outline-secondary',
                handler: 'paginationClickHandler(event)'
            },

        }

        if (!params.hasOwnProperty('text')) {
            params.text = types[type].text
        }
        if (!params.hasOwnProperty('class')) {
            params.class = types[type].class
        }
        if (!params.hasOwnProperty('handler')) {
            params.handler = types[type].handler
        }

        return new Button(params);
    }
}