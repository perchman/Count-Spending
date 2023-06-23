"use strict"

import Button from "./Button";

export default class ButtonDelete extends Button {
    constructor(params) {
        params.text = '<i class="bi bi-trash-fill pe-none"></i>';
        params.class = 'btn btn-delete btn-danger px-1 py-0';
        super(params);
    }
}