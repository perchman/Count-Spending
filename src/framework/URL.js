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
}