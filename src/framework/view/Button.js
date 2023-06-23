"use strict"

export default class Button {
    create(params) {
        params = params || {};
        let href = params.url ? `href="${params.url}"` : '';
        let id = params.id ? `id="${params.id}"` : '';

        return `<a ${href} ${id} class="${params.class}">${params.text}</a>`;
    }
}