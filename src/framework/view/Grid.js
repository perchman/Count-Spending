"use strict"

import Pagination from "./Pagination";
import ButtonFactory from "./button/ButtonFactory";

export default class Grid {
    constructor(data) {
        this.fields = data.fields;
        this.dataProvider = data.dataProvider;
        this.buttons = data.buttons;

        for (let handler in data.eventHandlers) {
            if (!window.hasOwnProperty(handler)) {
                window[handler] = data.eventHandlers[handler];
            }
        }
    }

    #createUrlSort(key, sortDirection) {
        let url = new URL(window.location.href);
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        url.searchParams.set('sort', `${key}_${sortDirection}`);
        return url.toString();
    }

    async render() {
        const buttonFactory = new ButtonFactory();

        let thead = '';
        let tbody = '';

        for (let header in this.fields) {
            let content;

            if (this.fields[header].sort) {
                const button = buttonFactory.factory(
                    'sort',
                    {
                        text: this.fields[header].text,
                        url: this.#createUrlSort(header, this.dataProvider.getSortDirection())
                    }
                );
                content = button.render();
            } else {
                content = this.fields[header].text;
            }

            thead += `<th class="col">${content}</th>`;
        }

        for (let item of await this.dataProvider.getData()) {
            tbody += '<tr>';
            const result = await item;
            for (let field in this.fields) {
                tbody += `<td>${await this.fields[field].value(result)}</td>`;
            }

            let buttons = '';
            for (let button in this.buttons) {
                const btn = buttonFactory.factory(
                    button,
                    {url: this.buttons[button].url(result)}
                );
                buttons += btn.render();
            }

            tbody += `
                <td>
                    ${buttons}
                </td></tr>
            `;
        }

        const pagination = new Pagination(
            await this.dataProvider.computeLimit(),
            this.dataProvider.config.pagination.pageSize,
            this.dataProvider.getPageNum(),
        );
        const paginationView = pagination.create();

        return `
            <div>
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
                ${paginationView}
            </div>
        `;
    }
}