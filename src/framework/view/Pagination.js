"use strict"

import ButtonFactory from "./button/ButtonFactory";

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
        const buttonFactory = new ButtonFactory();

        const info = `
            Showing <b>${this.limit.start + 1}</b> to \<b>${this.limit.end}</b> \
            of <b>${this.limit.count}</b> results
        `;

        const buttonPrev = buttonFactory.factory(
            'pagination',
            {
                text: 'Previous',
                url: this.createUrl(this.pageNum - 1),
            }
        );
        const buttonNext = buttonFactory.factory(
            'pagination',
            {
                text: 'Next',
                url: this.createUrl(this.pageNum + 1),
            }
        );

        let buttons = '';
        for (let i = 0; i < Math.ceil(this.limit.count / this.pageSize); i++) {
            const button = buttonFactory.factory(
                'pagination',
                {
                    text: i + 1,
                    url: this.createUrl(i + 1)
                }
            );
            buttons += button.render();
        }

        return `
            <div id="pagination" class="flex d-flex align-items-center justify-content-between">
                <div id="infoPagination">${info}</div>
                <div id="btnPagination" class="btn-group">
                    ${buttonPrev.render()}
                    ${buttons}
                    ${buttonNext.render()}
                </div>
            </div>
        `;
    }
}