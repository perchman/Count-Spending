"use strict"

import Form from "../../framework/view/form/Form";
import NumberField from "../../framework/view/form/fields/NumberField";
import FormButton from "../../framework/view/form/fields/FormButton";

export default class BalanceReplenish extends Form {
    constructor() {
        super(
            'balance',
            {
                replenish: {
                    name: 'replenish',
                    label: 'Amount',
                    validators: ['required', 'positiveNumber']
                }
            }
        );
    }

    render() {
        const replenish = new NumberField(this.fields.replenish);
        const replenishButton = new FormButton('Add');

        return `
            <form id="${this.getId()}" class="form-label mt-4" name="${this.name}">
                ${replenish.render()}
                ${replenishButton.render()}
            </form>
        `;
    }
}