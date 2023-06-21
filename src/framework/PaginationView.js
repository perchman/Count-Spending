"use strict"

import ButtonView from "./ButtonView";

export default class PaginationView {
    create(params) {
        const buttonView = new ButtonView();

        const info = `
            Showing <b>${params.firstElem}</b> to \<b>${params.lastElem}</b> \
            of <b>${params.quantityAll}</b> results
        `;

        const prevButton = buttonView.create(params.buttons.prevButton);
        const nextButton = buttonView.create(params.buttons.nextButton);

        let buttons = '';
        for (let i = 0; i < Math.ceil(params.quantityAll / params.quantityInPage); i++) {
            buttons += buttonView.create({
                text: i + 1,
                url: params.buttons.pageButton.url(i + 1),
                class: params.buttons.pageButton.class
            })
        }
        console.log(buttons);
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