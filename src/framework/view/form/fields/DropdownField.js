"use strict"

export default class DropdownField {
    constructor(params) {
        console.log(params)
        this.name = params.name;
        this.disabledOption = params.disabledOption;
        this.data = params.data;
    }

    render() {
        let options = '';
        this.data.forEach((item) => {
            options += `<option value="${item.id}">${item.name}</option>`;
        });

        return `
            <div class="d-flex w-50 mt-2">
                <select class="form-select w-50" name="${this.name}">
                    <option disabled selected hidden>${this.disabledOption}</option>
                    ${options}
                </select>
                <div id="error-${this.name}" class="invalid-feedback w-50 ps-3"></div>
            </div>
        `;
    }
}