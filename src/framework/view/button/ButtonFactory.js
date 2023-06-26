"use strict"

import Button from "./Button";

export default class ButtonFactory {
    static factory(type, params) {
        const types = {
            update: {
                text: '<i class="bi bi-pencil-fill pe-none"></i>',
                class: 'btn btn-update btn-warning px-1 py-0 ms-1'
            },
            delete: {
                text: '<i class="bi bi-trash-fill pe-none"></i>',
                class: 'btn btn-delete btn-danger px-1 py-0 ms-1'
            },
            pagination: {
                class: 'btn btn-pagination border btn-outline-secondary'
            },
            navbar: {
                class: 'nav-link'
            }
        }

        if (!params.hasOwnProperty('text')) {
            params.text = types[type].text
        }
        if (!params.hasOwnProperty('class')) {
            params.class = types[type].class
        }

        return new Button(params);
    }
}