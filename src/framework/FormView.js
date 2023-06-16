"use strict"

export default class FormView {
    create(params) {
        let fields = '';

        params.fields.forEach((field) => {
            fields += `
                <div class="col position-relative">
                    <input id="${field.id}" type="${field.type}" class="form-control" \
                    name="${field.name}" placeholder="${field.label}">
                    <div class="invalid-feedback">
                        ${field.invalid}
                    </div>
                </div>
            `;
        })

        return `
            <form id="${params.id}" class="form-label mt-4" name="${params.name}">
                <div class="row">
                    ${fields}
                    <div class="col-1">
                        <button type="submit" id= "btnForm" class="btn btn-primary w-100"> \ 
                        ${params.buttonText}</button>
                    </div>
                </div>
            </form>
        `;
    }
}