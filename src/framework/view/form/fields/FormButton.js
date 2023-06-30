"use strict"

export default class FormButton {
    constructor(form, text) {
        this.form = form;
        this.text = text;
    }

    render() {
        return `
            <div class="w-25 mt-3">
                 <button type="submit" id= "btnForm" class="btn btn-primary w-100">
                     ${this.text}
                 </button>
            </div>
        `;
    }
}