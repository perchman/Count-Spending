"use strict"

export default class CostForm {
    constructor(create, url) {
        this.create = create;
        this.url = url;
        this.body = document.body;
    }

    render() {
        const navbar = this.create.createNavbar([
            {
                text: 'Cost',
                url: this.url.createUrl({action: 'cost/index'}),
                class: 'nav-link'
            },
            {
                text: 'Category',
                url: this.url.createUrl({action: 'category/index'}),
                class: 'nav-link'
            }
        ]);
        const form = this.create.createForm(
            {
                id: 'form-cost',
                name: 'cost',
                fields: [
                    {
                        name: 'date',
                        type: 'date',
                        label: 'Date',
                    },
                    {
                        name: 'price',
                        type: 'number',
                        label: 'Price',
                    },
                    {
                        name: 'description',
                        type: 'text',
                        label: 'Description',
                    }
                ]
            }
        );

        this.body.innerHTML = `
            ${navbar}
            <div class="container mt-4">
                ${form}  
            </div>
        `;
    }
}