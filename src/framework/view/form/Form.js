"use strict"

import ValidatorFactory from "../../validators/ValidatorFactory";

export default class Form {
    constructor(name) {
        this.name = name;
    }

    getFields() {
        throw new Error("this method in not incremented");
    }

    getId() {
        return this.name + '-form';
    }

    before() {
        return `<form id="${this.getId()}" class="form-label mt-4" name="${this.name}">`;
    }

    end() {
        return '</form>';
    }

    onSuccessSubmit(callback) {
        const form = document.getElementById(this.getId());
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const fields = this.getFields();
            const validatorFactory = new ValidatorFactory();
            let data = {};
            let errors = {};
            const formData = new FormData(form);

            for (let field in fields) {
                const value = formData.get(field);

                fields[field].validators.forEach((type) => {
                    const validator = validatorFactory.factory(type);
                    const error = validator.validate(value);
                    if (error) {
                        errors[field] = error;
                        return;
                    }
                    data[field] = value;
                });

            }

            if (Object.keys(errors).length > 0) {
                for (let error in errors) {
                    const elem = document.getElementById('error-' + error);
                    elem.textContent = errors[error];
                    elem.style.display = 'block';
                }
            } else {
                callback(data);
            }
        })
    }
}