"use strict"

export default class Button {
    constructor(params) {
        console.log(params);
        this.href = params.url ? `href="${params.url}"` : '';
        this.id = params.id ? `id="${params.id}"` : '';
        this.class = params.class ? `class="${params.class}"` : '';
        this.text = params.text ? params.text : '';
    }

    render() {
        return `<a ${this.href} ${this.id} ${this.class}>${this.text}</a>`;
    }
}