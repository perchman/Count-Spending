"use strict"

import './bootstrap.css';
import Route from "./framework/Route";
import Url from "./framework/URL";
import View from "./framework/View";
import CostModel from "./model/Cost";
import CostController from "./controller/Cost";
import CostTable from "./view/CostTable";
import CostForm from "./view/CostForm";


document.addEventListener('DOMContentLoaded', () => {
    const route = new Route();
    const url = new Url();
    const view = new View();

    route.addRoute('cost/index', () => {
        const model = new CostModel();
        const indexView = new CostTable(view, url);
        const controller = new CostController(model, indexView, route);

        controller.index();
    });

    route.addRoute('cost/create', () => {
        const model = new CostModel();
        const createView = new CostForm(view, url);
        const controller = new CostController(model, createView, route);

        controller.create();
    });

    route.addRoute('cost/update', () => {
        const model = new CostModel();
        const updateView = new CostForm();
        const controller = new CostController(model, updateView);

        controller.update();
    });

    route.route();
});


// 'cost/index': () => {
//
// },
//     'cost/create': () => {
//     const model = new CostModel();
//     const controller = new CostController();
//     const view = new CostForm();
//
//     controller.setModel(model);
//     controller.setView(view);
//     controller.gatherCostCreate();
// },
//     'cost/update': () => {
//     const model = new CostModel();
//     const controller = new CostController();
//     const view = new CostForm();
//
//     controller.setModel(model);
//     controller.setView(view);
//     controller.gatherCostUpdate();
// }