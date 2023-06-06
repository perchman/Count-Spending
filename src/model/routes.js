"use strict"

const routes = {
    'cost/index': {
        headers: [
            {
                name: 'Date',
                sort: true
            },
            {
                name:'Price',
                sort: true
            },
            {
                name: 'Description',
                sort: false
            }
        ],
        data: JSON.parse(localStorage.getItem('costs')),
        buttons: {
            add: {
                url: '?action=cost/create',
                text: 'Add cost'
            }
        }
    },
    'category/index': {
        headers: {
            id: {
                name: 'Id',
                sort: true
            },
            category: {
                name: 'Category',
                sort: false
            }
        },
        data: JSON.parse(localStorage.getItem('categories'))
    },
    'cost/create': {
        id: 'cost-form',
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
};

export default routes;
