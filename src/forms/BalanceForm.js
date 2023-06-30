"use strict"

import Form from "../framework/view/form/Form";

export default class BalanceForm extends Form {
    constructor() {
        super('balance',);
    }

    getFields() {
        return {
            replenish: {
                name: 'replenish',
                label: 'Amount',
                validators: ['required', 'positiveNumber']
            }
        }
    }

    render() {


        return `
            <form id="${this.getId()}" class="form-label mt-4" name="${this.name}">
                ${replenish.render()}
                ${replenishButton.render()}
            </form>
        `;
    }
}