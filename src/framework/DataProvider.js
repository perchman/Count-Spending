"use strict"

export default class DataProvider {
    constructor(config) {
        this.config = config;
    }

    getPageNum() {
        const url = new URL(window.location.href);
        return parseInt(url.searchParams.get('page')) || 1;
    }

    async computeLimit() {
        const count = await this.config.model.getCount()
        const start = (this.getPageNum() - 1) * this.config.pagination.pageSize;
        const end = Math.min(start + this.config.pagination.pageSize, count);

        return {
            start: start,
            end: end,
            count: count
        }
    }

    getSortDirection() {
        return this.computeOrderBy().split(' ')[1];
    }

    computeOrderBy() {
        const sort = this.config.sort;

        if (!sort.orderBy) {
            return sort.defaultOrder;
        }

        const [key, direction] = sort.orderBy.split('_');
        return key + ' ' + direction;
    }

    async getData() {
        return await this.config.model.getPart(
            this.computeOrderBy(),
            await this.computeLimit()
        );
    }
}