"use strict"

export default class Controller {
    constructor() {}

    setModel(model) {
        this.model = model;
        return this;
    }

    setView(view) {
        this.view = view;
        return this;
    }

    defineRoute() {
        this.url = new URL(window.location.href);
        this.action = this.url.searchParams.get('action') || 'cost/index';

        this.model.changeView(this.action);
    }

    handelClick = (e) => {
        e.preventDefault();
        window.history.pushState({}, "", e.target.href);

        this.defineRoute();
    }

    addEntity(e) {
        e.preventDefault();
        let data = new FormData(e.target);


    }
}