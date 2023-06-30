"use strict"

import Form from "../framework/view/form/Form";

export default class CategoryForm extends Form {
    constructor(category) {
        super('category');
        this.category = category || {};
    }

    getFields() {
        return {
            categoryName: {
                name: 'categoryName',
                label: 'Category Name',
                value: this.category.name || '',
                validators: ['required', 'maxLength']
            }
        };
    }
}
