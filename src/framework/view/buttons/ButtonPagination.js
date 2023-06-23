"use strict"

import Button from "./Button";

export default class ButtonPagination extends Button {
    constructor(params) {
        params.class = 'btn btn-pagination table-link border btn-outline-secondary';
        super(params);
    }
}