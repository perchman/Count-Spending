"use strict"

import Form from "../framework/view/form/Form";
import DateField from "../framework/view/form/fields/DateField";
import DropdownField from "../framework/view/form/fields/DropdownField";
import TextField from "../framework/view/form/fields/TextField";
import NumberField from "../framework/view/form/fields/NumberField";
import FormButton from "../framework/view/form/fields/FormButton";

export default class CostForm extends Form {
    constructor(fields) {
        super('cost', fields);
    }
    render() {
        const dateField = new DateField(this.fields.date);
        const categoryField = new DropdownField(this.fields.category);
        const priceField = new NumberField(this.fields.price);
        const descriptionField = new TextField(this.fields.description);
        const saveButton = new FormButton('Save');

        return `
            <form id="${this.getId()}" class="form-label" name="${this.name}">
                ${dateField.render()}
                ${categoryField.render()}
                ${priceField.render()}
                ${descriptionField.render()}
                ${saveButton.render()}
            </form>
        `;
    }
}