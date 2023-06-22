"use strict"

import PaginationView from "./PaginationView";
import ButtonView from "./ButtonView";

export default class GridView {
    create(data) {
        const buttonView = new ButtonView();
        const paginationView = new PaginationView();

        const url = new URL(window.location.href);
        const pageNum = url.searchParams.get('page') || 1;
        const dataCount = data.model.getCount()
        const start = (pageNum - 1) * data.pagination.pageSize;
        const end = Math.min(start + data.pagination.pageSize, dataCount);

        let thead = '';
        let tbody = '';

        for (let header in data.fields) {
            let content;

            if (data.fields[header].sort) {
                content = buttonView.create(data.fields[header]);
            } else {
                content = data.fields[header].text;
            }

            thead += `<th class="col">${content}</th>`;
        }

        for (let item of data.model.getPart('date desc', start, end)) {
            tbody += '<tr>';

            for (let field in data.fields) {
                tbody += `<td>${data.fields[field].value(item)}</td>`;
            }

            tbody += `
                <td>
                    ${buttonView.create({
                text: data.buttons.update.text,
                url: data.buttons.update.url(item),
                class: data.buttons.update.class
            })}
                    ${buttonView.create({
                text: data.buttons.delete.text,
                url: data.buttons.delete.url(item),
                class: data.buttons.delete.class
            })}
                </td></tr>
            `;
        }

        const pagination = paginationView.create(data.pagination);

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
                ${pagination}
            </div>
        `;
    }
}