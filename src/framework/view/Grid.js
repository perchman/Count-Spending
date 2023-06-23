"use strict"

import Pagination from "./Pagination";
import Button from "./buttons/Button";
import ButtonUpdate from "./buttons/ButtonUpdate";
import ButtonDelete from "./buttons/ButtonDelete";

export default class Grid {
    create(data) {
        let thead = '';
        let tbody = '';

        for (let header in data.fields) {
            let content;

            if (data.fields[header].sort) {
                const button = new Button((data.fields[header]));
                content = button.render();
            } else {
                content = data.fields[header].text;
            }

            thead += `<th class="col">${content}</th>`;
        }

        for (let item of data.dataProvider.getData()) {
            tbody += '<tr>';

            for (let field in data.fields) {
                tbody += `<td>${data.fields[field].value(item)}</td>`;
            }

            const buttonUpdate = new ButtonUpdate({
                url: data.buttons.update.callbackUrl(item)
            });
            const buttonDelete = new ButtonDelete({
                url: data.buttons.delete.callbackUrl(item)
            })
            tbody += `
                <td>
                    ${buttonUpdate.render()}
                    ${buttonDelete.render()}
                </td></tr>
            `;
        }

        const pagination = new Pagination(
            data.dataProvider.getLimit(),
            data.dataProvider.config.pagination.pageSize,
            data.dataProvider.getPageNum(),
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