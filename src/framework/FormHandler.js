"use strict"

import ValidatorFactory from "./validate/ValidatorFactory";

export default class FormHandler {
    constructor(name, fields) {
        this.name = name;
        this.fields = fields;
    }

    getId() {
        return 'form-' + this.name;
    }

    onSuccessSubmit(callback) {
        const form = document.getElementById(this.getId());
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const validatorFactory = new ValidatorFactory();
            let data = {};
            let errors = {};
            const formData = new FormData(form);
            for (let field of this.fields) {
                // {
                //     name: 'date',
                //         type: 'date',
                //     label: 'Date',
                //     validators: ['required']
                // },

            }

            if (errors) {
                console.log(errors);
                // render errors
            } else {
                callback(data);
            }
        })
    }
}