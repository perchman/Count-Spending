"use strict"

export default class View {
    constructor() {
        this.content = document.getElementById('content');
    }

    setController(controller) {
        this.controller = controller;
    }

    renderTable(config) {
        if (!config.data) {
            return '<p class="mt-4 text-decoration-underline fst-italic">No records</p>'
        } else {
            let thead = '';
            let tbody = '';

            config.headers.forEach((header) => {
                if (header.sort) {
                    thead += `
                        <th class="col">
                            <a href="#?sort=date_asc" class="btn p-0 fw-bold">header</a>
                        </th>
                    `
                }
            })

            return `
                <table id="table" class="table table-hover table-bordered mt-4">
                    <thead>
                        <tr>
                            ${thead}
                            <th class="col-1"></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tbody}
                    </tbody>
                </table>
            `;
        }
    }

    renderTablePage(config) {
        this.content.innerHTML = `
            <div>
                <a href="${config.buttons.add.url}" id="btn-add" class="btn btn-primary">${config.buttons.add.text}</a>
            </div>
            <div>
                ${this.renderTable(config)}
            </div>
        `;
    }

    renderFormPage(config) {
        let form = `<form id="${config.id}" class="form-label" \
        name="${config.name}"><div class="row mt-4">`;

        config.fields.forEach((field) => {
            form += `
                <div class="col">
                    <input type="${field.type}" class="form-control" \
                    name="${field.name}" placeholder="${field.label}">
                </div>
            `;
        });

        form += `
            <div class="col-1">
                <button type="submit" id= "btn-save" class="btn btn-primary w-100">Save</button>
            </div></div></form>
        `;

        this.content.innerHTML = form;
    }
}