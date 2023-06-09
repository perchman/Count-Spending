"use strict"

export default class Url {
    constructor() {}

    createUrl(action) {
        const url = new URL(window.location.href);
        url.search = '';
        url.searchParams.set('action', action);
        return url.toString();
    }

    createUrlSort(key, sortDirection) {
        let url = new URL(window.location.href);
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        url.searchParams.set('sort', `${key}_${sortDirection}`);
        return url;
    }

    createUrlPagination(pageNum, length) {
        let url = new URL(window.location.href);
        let search = url.searchParams;

        if (pageNum === 0) {
            search.set('page', 1);
        } else if (pageNum > Math.ceil(length / quantityElems)) {
            search.set('page', pageNum - 1);
        } else {
            search.set('page', pageNum);
        }

        return url;
    }
}