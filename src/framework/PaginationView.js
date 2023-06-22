"use strict"

import ButtonView from "./ButtonView";

export default class PaginationView {
    create(data) {
        console.log(data);
        const buttonView = new ButtonView();

        const url = new URL(window.location.href);
        const pageNum = url.searchParams.get('page') || 1;


        const info = `
            Showing <b>${data.firstElem}</b> to \<b>${data.lastElem}</b> \
            of <b>${data.quantityAll}</b> results
        `;

        const prevButton = buttonView.create(data.buttons.prevButton);
        const nextButton = buttonView.create(data.buttons.nextButton);

        let buttons = '';
        for (let i = 0; i < Math.ceil(data.quantityAll / data.quantityInPage); i++) {
            buttons += buttonView.create({
                text: i + 1,
                url: data.buttons.pageButton.url(i + 1),
                class: data.buttons.pageButton.class
            })
        }

        return `
            <div id="pagination" class="flex d-flex align-items-center justify-content-between">
                <div id="infoPagination">${info}</div>
                <div id="btnPagination" class="btn-group">
                    ${prevButton}
                    ${buttons}
                    ${nextButton}
                </div>
            </div>
        `;
    }
}