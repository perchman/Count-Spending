"use strict"

import Button from "./Button";

export default class ButtonUpdate extends Button {
    constructor(params) {
        params.text = '<i class="bi bi-pencil-fill pe-none"></i>';
        params.class = 'btn btn-delete btn-warning px-1 py-0';
        super(params);
    }
}