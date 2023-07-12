"use strict"

export default class Button {
    constructor(params) {
        this.href = params.url ? `href="${params.url}"` : '';
        this.id = params.id ? `id="${params.id}"` : '';
        this.class = params.class ? `class="${params.class}"` : '';
        this.handler = params.handler ? `onclick="${params.handler}"` : '';
        this.text = params.text ? params.text : '';
    }

    render() {
        return `<a ${this.href} ${this.id} ${this.class} ${this.handler}>${this.text}</a>`;
    }
}