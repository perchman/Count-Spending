"use strict"

export default class TextField {
    constructor(form, params) {
        this.form = form;
        this.name = params.name;
        this.label = params.label;
        this.value = params.value || '';
    }

    render() {
        return `
            <div>
                <div class="d-flex w-50 mt-2">
                    <input type="text" class="form-control w-50" name="${this.name}" \
                    placeholder="${this.label}" value="${this.value}">
                    <div id="error-${this.name}" class="invalid-feedback w-50 ps-3"></div>
                </div>
            </div>
        `;
    }
}