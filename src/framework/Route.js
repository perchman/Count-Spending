"use strict"

export default class Route {
    constructor() {
        this.routes = {};
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