"use strict"

export default class Url {
    constructor() {}

    createUrl(params) {
        let url = new URL(window.location.href);
        url.search = '';

        for (let param in params) {
            url.searchParams.set(param, params[param]);
        }

        return url.toString();
    }

    createUrlSort(key, sortDirection) {
        let url = new URL(window.location.href);
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
        url.searchParams.set('sort', `${key}_${sortDirection}`);
        return url.toString();
    }

    createUrlPagination(params) {
        let url = new URL(window.location.href);
        let search = url.searchParams;

        if (params.pageNum === 0) {
            search.set('page', 1);
        } else if (params.pageNum > Math.ceil(params.quantityAllElems / params.quantityElemsPerPage)) {
            search.set('page', params.pageNum - 1);
        } else {
            search.set('page', params.pageNum);
        }

        return url.toString();
    }
}