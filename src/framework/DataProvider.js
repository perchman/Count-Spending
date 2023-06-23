"use strict"

export default class DataProvider {
    constructor(config) {
        this.config = config;
    }

    getPageNum() {
        const url = new URL(window.location.href);
        return parseInt(url.searchParams.get('page')) || 1;
    }

    getLimit() {
        const count = this.config.model.getCount()
        const start = (this.getPageNum() - 1) * this.config.pagination.pageSize;
        const end = Math.min(start + this.config.pagination.pageSize, count);

        return {
            start: start,
            end: end,
            count: count
        }
    }

    getOrderBy() {
        const key = Object.keys(this.config.sort.defaultOrder).toString();
        const value = this.config.sort.defaultOrder[key];

        return key + ' ' + value;
    }

    getDataForPage() {
        return this.config.model.getPart(
            this.getOrderBy(),
            this.getLimit()
        );
    }
}