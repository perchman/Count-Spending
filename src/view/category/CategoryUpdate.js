"use strict"

import Form from "../../framework/view/form/Form";
import TextField from "../../framework/view/form/fields/TextField";
import FormButton from "../../framework/view/form/fields/FormButton";

export default class CategoryUpdate extends Form {
    constructor(category) {
        super(
            'category',
            {
                categoryName: {
                    name: 'categoryName',
                    label: 'Category Name',
                    value: category.name,
                    validators: ['required', 'maxLength']
                }
            }
        );
    }
    render() {
        const categoryNameField = new TextField(this.fields.categoryName);
        const saveButton = new FormButton('Save');

        return `
            <form id="${this.getId()}" class="form-label mt-4" name="${this.name}">
                ${categoryNameField.render()}
                ${saveButton.render()}
            </form>
        `;
    }
}