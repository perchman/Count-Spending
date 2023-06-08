"use strict"

export default class CostTable {
    constructor() {
        this.content = document.getElementById('content');
    }

    createTable(costs) {
        let tbody = '';
        costs.forEach((cost) => {
            tbody += `
                <tr>
                    <td class="col-2">${cost.date}</td>
                    <td class="col-2">${cost.price}</td>
                    <td class="col-7">${cost.description}</td>
                    <td class="col-1">
                        <a href="?action=cost/update&id=${cost.id}" class="btn btn-update p-0">
                            <i class="bi bi-pencil-fill text-warning pe-none"></i>
                        </a>
                        <a href="?action=cost/delete&id=${cost.id}" class="btn btn-delete p-0">
                            <i class="bi bi-trash-fill text-danger pe-none"></i>
                        </a>
                    </td>
                </tr>
            `;
        })

        return `
            <table class="table table-hover table-bordered mt-4">
                <thead>
                    <tr>
                        <th class="col-2">
                            <a href="/" class="btn p-0 fw-bold">Date</a>
                        </th>
                        <th class="col-2">
                            <a href="/" class="btn p-0 fw-bold">Price</a>
                        </th>
                        <th class="col-7">Description</th>
                        <th class="col-1"></th>
                    </tr>
                </thead>
                <tbody>
                    ${tbody}
                </tbody>
            </table>
        `;
    }

    render(data) {
        this.content.innerHTML = `
            <a href="?action=cost/create" id="btn-add" class="btn btn-primary">Add cost</a>
            ${this.createTable(data)}
        `;
    }
}