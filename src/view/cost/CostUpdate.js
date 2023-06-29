"use strict"

import Form from "../../framework/view/form/Form";
import DateField from "../../framework/view/form/fields/DateField";
import DropdownField from "../../framework/view/form/fields/DropdownField";
import TextField from "../../framework/view/form/fields/TextField";
import NumberField from "../../framework/view/form/fields/NumberField";
import FormButton from "../../framework/view/form/fields/FormButton";
import Category from "../../model/Category";

export default class CostUpdate extends Form {
    constructor(cost) {
        console.log(cost.category.id);
        super(
            'cost',
            {
                date: {
                    name: 'date',
                    label: 'Date',
                    value: cost.date.toISOString().split('T')[0],
                    validators: ['required']
                },
                category: {
                    name: 'category',
                    data: Category.getAll('id desc'),
                    selected: cost.category.id,
                    validators: ['required']
                },
                price: {
                    name: 'price',
                    label: 'Price',
                    value: cost.price,
                    validators: ['required', 'positiveNumber']
                },
                description: {
                    name: 'description',
                    label: 'Description',
                    value: cost.description,
                    validators: ['required', 'maxLength']
                }
            }
        );
    }
    render() {
        const dateField = new DateField(this.fields.date);
        const categoryField = new DropdownField(this.fields.category);
        const priceField = new NumberField(this.fields.price);
        const descriptionField = new TextField(this.fields.description);
        const saveButton = new FormButton('Save');

        return `
            <form id="${this.getId()}" class="form-label mt-4" name="${this.name}">
                ${dateField.render()}
                ${categoryField.render()}
                ${priceField.render()}
                ${descriptionField.render()}
                ${saveButton.render()}
            </form>
        `;
    }
}