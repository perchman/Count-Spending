"use strict"

import Form from "../framework/view/form/Form";
import Category from "../model/Category";

export default class CostForm extends Form {
    constructor(cost) {
        super('cost');
        this.cost = cost;
    }

    async getFields() {
        const cost = this.cost || {};

        return {
            date: {
                name: 'date',
                label: 'Date',
                value: cost.date ? cost.date.toISOString().split('T')[0] : '',
                validators: ['required']
            },
            category: {
                name: 'category',
                data: await Category.getAll('id desc'),
                disabledOption: 'Select a category',
                selected: cost.category ? cost.category.id : null,
                validators: ['required']
            },
            price: {
                name: 'price',
                label: 'Price',
                value: cost.price || '',
                validators: ['required', 'positiveNumber']
            },
            description: {
                name: 'description',
                label: 'Description',
                value: cost.description || '',
                validators: ['required', 'maxLength']
            }
        };
    }
}