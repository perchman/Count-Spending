"use strict"

export default class View {
    constructor() {
        this.content = document.getElementById('content');
    }

    createNavbar(params) {
        let buttons = '';
        params.forEach((param) => {
            buttons += `
            <li class="nav-item">
                ${this.createButton(param)}
            </li>
            `;
        })

        return `
            <nav class="navbar navbar-expand navbar-dark bg-primary">
                <div class="container">
                    <span class="navbar-brand">Count Spending</span>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            ${buttons}
                        </ul>
                    </div>
                </div>
            </nav>
        `;
    }

    createButton(params) {
        params = params || {};
        let href = params.url ? `href="${params.url}"` : '';
        let id = params.id ? `id="${params.id}"` : '';

        return `<a ${href} ${id} class="${params.class}">${params.text}</a>`;
    }

    createForm(params) {
        let form = `<form id="${params.id}" class="form-label" name="${params.name}"><div class="row mt-5">`;

        params.fields.forEach((field) => {
            form += `
                <div class="col">
                    <input type="${field.type}" class="form-control" \
                    name="${field.name}" placeholder="${field.label}">
                </div>
            `;
        })

        // for (let obj in params.fields) {
        //     form += `
        //         <div class="col">
        //             <input type="${params.fields[obj].type}" class="form-control" \
        //             name="${params.fields[obj].name}" placeholder="${params.fields[obj].label}">
        //         </div>
        //     `;
        // }

        form += `
            <div class="col-1">
                <button type="submit" id= "btnForm" class="btn btn-primary w-100">Save</button>
            </div></div></form>
        `;

        return form;
    }

    createTable(data) {
        let thead = '';
        let tbody = '';

        Object.values(data.headers).forEach((header) => {
            let content;

            if (header.sort) {
                content = this.createButton(header)
            } else {
                content = header.text;
            }

            thead += `<th class="col">${content}</th>`;
        });

        data.rows.forEach((row) => {
            tbody += '<tr>';

            Object.keys(data.headers).forEach((header) => {
                tbody += `<td>${row[header]}</td>`;
            })

            tbody += `
                <td>
                    ${this.createButton({
                        text: data.buttons.update.text,
                        url: data.buttons.update.url(row),
                        class: data.buttons.update.class
                    })}
                    ${this.createButton({
                        text: data.buttons.delete.text,
                        url: data.buttons.delete.url(row),
                        class: data.buttons.delete.class
                    })}
                </td></tr>
            `;
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