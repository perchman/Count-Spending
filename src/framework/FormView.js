"use strict"

export default class FormView {
    create(params) {
        let fields = '';

        params.fields.forEach((field) => {
            if (field.tag === 'input') {
                fields += this.createInput(field);
            } else if (field.tag === 'select') {
                fields += this.createSelect(field);
            } else {
                throw new Error(field.tag + " tag not supported");
            }
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

    createInput(field) {
        return `
            <div class="col position-relative">
                <input id="${field.id}" type="${field.type}" class="form-control" \
                name="${field.name}" placeholder="${field.label}">
            </div>
        `;
    }

    createSelect(field) {
        let options = '';
        field.options.forEach((option) => {
            options += `<option value="${option.id}">${option.name}</option>`;
        });

        return `
            <div class="col">
                <select id="${field.id}" class="form-select" name="${field.name}">
                    <option disabled selected hidden>${field.disabledOption}</option>
                    ${options}
                </select>
            </div>
        `;
    }
}