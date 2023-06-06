"use strict"

import './bootstrap.css';
import Model from "./model/model";
import View from "./view/view";
import Controller from "./controller/controller";

document.addEventListener('DOMContentLoaded', () => {
    const model = new Model();
    const view = new View();
    const controller = new Controller();

    model.setView(view);
    view.setModel(model).setController(controller);
    controller.setModel(model).setView(view);
    view.render();
});
