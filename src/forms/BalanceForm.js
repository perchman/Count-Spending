"use strict"

import Form from "../framework/view/form/Form";

export default class BalanceForm extends Form {
    constructor() {
        super('balance',);
    }

    getFields() {
        return {
            date: {
                name: 'date',
                label: 'Date',
                validators: ['required']
            },
            replenish: {
                name: 'replenish',
                label: 'Amount',
                validators: ['required', 'positiveNumber']
            }
        }
    }
}