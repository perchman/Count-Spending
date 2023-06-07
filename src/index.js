"use strict"

import './bootstrap.css';
import Model from "./model/model";
import View from "./view/view";
import Controller from "./controller/controller";

document.addEventListener('DOMContentLoaded', () => {
    const model = new Model();
    const view = new View();
    const controller = new Controller();

    model.setController(controller);
    view.setController(controller);
    controller.setModel(model).setView(view).addEventsNavbarButtons();
    controller.route();
});
