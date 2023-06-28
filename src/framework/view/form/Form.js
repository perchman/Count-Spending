"use strict"

import ValidatorFactory from "../../validators/ValidatorFactory";

export default class Form {
    constructor(name, fields) {
        this.name = name;
        this.fields = fields;
    }

    render() {
        throw new Error("this method in not incremented");
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

            for (let field in this.fields) {
                const value = formData.get(this.fields[field].name);

                this.fields[field].validators.forEach((type) => {
                    const validator = validatorFactory.factory(type);
                    const validationResult = validator.validate(value);
                    if (!validationResult) {
                        data[this.fields[field].name] = value;
                    } else {
                        errors[this.fields[field].name] = validationResult;
                    }
                })

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