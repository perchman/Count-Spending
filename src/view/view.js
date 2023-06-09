"use strict"

export default class View {
    constructor() {
        this.content = document.getElementById('content');
    }

    setUrl(url) {
        this.url = url;
    }

    createNavbar(params) {
        let buttons = '';
        params.forEach((button) => {
            buttons += `
            <li class="nav-item">
                ${this.createButton(params)}
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
        ;`
    }

    createButton(params) {
        params = params || {};
        let href = params.url ? `href="${params.url}"` : '';
        let id = params.id ? `id="${params.id}"` : '';

        return `<a ${href} ${id} class="${params.class}">${params.text}</a>`;
    }

    createTable(headers, data, sortDirection, buttons) {
        let thead = '';
        let tbody = '';

        for (let header in headers) {
            let thContent;

            if (headers[header].sort) {
                thContent = this.createButton({
                    text: headers[header].name,
                    url: this.url.createUrlSort(header, sortDirection),
                    class: headers
                });
            } else {
                thContent = headers[header].name;
            }

            thead += `<th class="col">${thContent}</th>`;
        }

        for (let elem in data) {
            tbody += '<tr>';

            for (let header in headers) {
                let tdContent;
                if (headers[header].value) {
                    if (typeof headers[header].value === 'function') {
                        tdContent = headers[header].value(data[elem])
                    } else {
                        throw new Error('Value data type is not supported');
                    }
                } else {
                    tdContent = data[elem][header];
                }

                tbody += `<td>${tdContent}</td>`;
            }

            tbody += `
            <td class="col-1">
                ${this.createButton({
                text: btnEditHtml,
                url: buttons.update.url(data[elem]),
                class: btnTableClass + ' btn-update',
            })}
                ${this.createButton({
                text: btnDeleteHtml,
                url: buttons.delete.url(data[elem]),
                class: btnTableClass + ' btn-delete',
            })}
            </td></tr>
        `;
        }

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

    createPagination(length, start, end, pageNum) {
        if (Math.floor(length / (quantityElems + 1)) === 0) {
            return '';
        } else {
            let info = `Showing <b>${start + 1}</b> to <b>${end}</b> of <b>${length}</b> results`;
            let buttons = '<div id="btnPagination" class="btn-group">';

            buttons += `
            <a href="${createUrlPagination(pageNum - 1)}" \
            class="btn btn-pagination table-link border btn-outline-secondary">Previous</a>
        `;

            for (let i = 0; i < Math.ceil(length / quantityElems); i++) {
                if (pageNum === i + 1) {
                    buttons += `
                    <a href="${createUrlPagination(i + 1)}" \
                    class="btn btn-pagination table-link active border btn-outline-secondary">${i + 1}</a>
                `;
                } else {
                    buttons += `
                    <a href="${createUrlPagination(i + 1)}" \
                    class="btn btn-pagination table-link border btn-outline-secondary">${i + 1}</a>
                `;
                }
            }

            buttons += `
            <a href="${createUrlPagination(pageNum + 1, length)}" \
            class="btn btn-pagination table-link border btn-outline-secondary">Next</a>
        `;

            return `
            <div id="pagination" class="flex d-flex align-items-center justify-content-between">
                <div id="infoPagination">${info}</div>
                ${buttons}
            </div>
        `;
        }
    }

}