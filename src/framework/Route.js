"use strict"

export default class Route {
    constructor() {
        this.routes = {};

        window.addEventListener('popstate', (e) => this.routing());
    }

    redirect(url) {
        window.history.pushState({}, "", url);
        window.dispatchEvent(new Event('popstate'));
    }

    routing() {
        const url = new URL(window.location.href);
        const action = url.searchParams.get('action') || 'cost/index';
        const handler = this.routes[action];
        if (!handler) {
            throw new Error(action + " route not found");
        }
        handler();
    }

    addRoute(route, handler) {
        this.routes[route] = handler;
    }
}