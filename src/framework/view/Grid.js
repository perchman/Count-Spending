"use strict"

import Pagination from "./Pagination";
import Button from "./button/Button";
import ButtonFactory from "./button/ButtonFactory";

export default class Grid {
    constructor(data) {
        this.fields = data.fields;
        this.dataProvider = data.dataProvider;
        this.buttons = data.buttons;
    }
    render() {
        const buttonFactory = new ButtonFactory();

        let thead = '';
        let tbody = '';

        for (let header in this.fields) {
            let content;

            if (this.fields[header].sort) {
                const button = new Button((this.fields[header]));
                content = button.render();
            } else {
                content = this.fields[header].text;
            }

            thead += `<th class="col">${content}</th>`;
        }

        for (let item of this.dataProvider.getData()) {
            tbody += '<tr>';

            for (let field in this.fields) {
                tbody += `<td>${this.fields[field].value(item)}</td>`;
            }

            let buttons = '';
            for (let button in this.buttons) {
                const btn = buttonFactory.factory(
                    button,
                    {url: this.buttons[button].url(item)}
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
            this.dataProvider.getLimit(),
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