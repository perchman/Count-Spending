"use strict"

import Button from "./Button";

export default class Pagination {
    constructor(limit, pageSize, pageNum) {
        this.limit = limit;
        this.pageSize = pageSize;
        this.pageNum = pageNum;
    }

    createUrl(pageNum) {
        let url = new URL(window.location.href);
        let search = url.searchParams;

        if (pageNum === 0) {
            search.set('page', 1);
        } else if (pageNum > Math.ceil(this.limit.count / this.pageSize)) {
            search.set('page', pageNum - 1);
        } else {
            search.set('page', pageNum);
        }

        return url.toString();
    }

    create(data) {
        const info = `
            Showing <b>${this.limit.start + 1}</b> to \<b>${this.limit.end}</b> \
            of <b>${this.limit.count}</b> results
        `;

        const prevButton = new Button({
            text: 'Previous',
            url: this.createUrl(this.pageNum - 1),
            class: 'btn btn-pagination table-link border btn-outline-secondary'
        });
        const nextButton = new Button({
            text: 'Next',
            url: this.createUrl(this.pageNum + 1),
            class: 'btn btn-pagination table-link border btn-outline-secondary'
        })

        let buttons = '';
        for (let i = 0; i < Math.ceil(this.limit.count / this.pageSize); i++) {
            const button = new Button({
                text: i + 1,
                url: this.createUrl(i + 1),
                class: 'btn btn-pagination table-link border btn-outline-secondary'
            })
            buttons += button.render();
        }

        return `
            <div id="pagination" class="flex d-flex align-items-center justify-content-between">
                <div id="infoPagination">${info}</div>
                <div id="btnPagination" class="btn-group">
                    ${prevButton.render()}
                    ${buttons}
                    ${nextButton.render()}
                </div>
            </div>
        `;
    }
}