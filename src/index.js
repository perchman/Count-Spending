"use strict"

import './bootstrap.css';
import Controller from "./controller/Controller";
import Route from "./route/Route";

document.addEventListener('DOMContentLoaded', () => {
    const controller = new Controller();
    const route = new Route();

    controller.setRoute();
    route.route();
});
