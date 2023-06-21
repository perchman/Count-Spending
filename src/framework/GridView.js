"use strict"

import ButtonView from "./ButtonView";

export default class GridView {
    create(data) {
        const buttonView = new ButtonView();
        console.log(data.model.getAll('date desc'));
        let thead = '';
        let tbody = '';

        for (let header in data.headers) {
            let content;

            if (data.headers[header].sort) {
                content = buttonView.create(data.headers[header]);
            } else {
                content = data.headers[header].text;
            }

            thead += `<th class="col">${content}</th>`;
        }

        for (let row of data.model.getAll('date desc')) {
            tbody += '<tr>';

            for (let header in data.headers) {
                tbody += `<td>${row[header]}</td>`;
            }

            tbody += `
                <td>
                    ${buttonView.create({
                        text: data.buttons.update.text,
                        url: data.buttons.update.url(row),
                        class: data.buttons.update.class
                    })}
                    ${buttonView.create({
                        text: data.buttons.delete.text,
                        url: data.buttons.delete.url(row),
                        class: data.buttons.delete.class
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
}