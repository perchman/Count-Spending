"use strict"

export default class Form {
    constructor(name) {
        this.name = name;
    }

    begin() {
        return `<form id="form-${this.name}" class=" mt-4" name="${this.name}">`;
    }

    end() {
        return `</form>`;
    }

    // render() {
    //     let fields = '';
    //     this.fields.forEach((field) => {
    //         if (field.tag === 'input') {
    //             fields += this.createInput(field);
    //         } else if (field.tag === 'textarea') {
    //             fields += this.createTextArea(field);
    //         } else if (field.tag === 'select') {
    //             fields += this.createSelect(field);
    //         } else {
    //             throw new Error(field.tag + " tag not supported");
    //         }
    //     })
    //
    //     return `
    //         <form id="${this.id}" class=" mt-4" name="${this.name}">
    //                 ${fields}
    //             <div class="w-25 mt-3">
    //                 <button type="submit" id= "btnForm" class="btn btn-primary w-100">
    //                     ${this.buttonText}
    //                 </button>
    //             </div>
    //         </form>
    //     `;
    // }
    //
    // createInput(field) {
    //     return `
    //         <div class="d-flex w-50 mt-2">
    //             <input id="${field.id}" type="${field.type}" class="form-control w-50" \
    //             name="${field.name}" placeholder="${field.label}">
    //             <div class="invalid-feedback w-50 ps-3">
    //                 Please choose a username.
    //             </div>
    //         </div>
    //     `;
    // }
    //
    // createTextArea(field) {
    //     return `
    //         <div class="d-flex w-50 mt-2">
    //             <textarea id="${field.id}" type="${field.type}" class="form-control w-50" \
    //             name="${field.name}" placeholder="${field.label}"></textarea>
    //             <div class="invalid-feedback w-50 ps-3">
    //                 Please choose a username.
    //             </div>
    //         </div>
    //     `;
    // }
    //
    // createSelect(field) {
    //     let options = '';
    //     field.options.forEach((option) => {
    //         options += `<option value="${option.id}">${option.name}</option>`;
    //     });
    //
    //     return `
    //         <div class="d-flex w-50 mt-2">
    //             <select id="${field.id}" class="form-select w-50" name="${field.name}">
    //                 <option disabled selected hidden>${field.disabledOption}</option>
    //                 ${options}
    //             </select>
    //             <div class="invalid-feedback w-50 ps-3">
    //                 Please choose a username.
    //             </div>
    //         </div>
    //     `;
    // }
}