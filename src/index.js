"use strict"

import './bootstrap.css';
import Route from "./framework/Route";
import CostController from "./controller/CostController";
import CostIndex from "./view/CostIndex";
import CostShape from "./view/CostShape";
import CategoryController from "./controller/CategoryController";
import CategoryIndex from "./view/CategoryIndex";
import CategoryShape from "./view/CategoryShape";
import BalanceController from "./controller/BalanceController";
import BalanceIndex from "./view/BalanceIndex";
import BalanceReplenish from "./view/BalanceReplenish";


document.addEventListener('DOMContentLoaded', () => {
    const route = new Route();

    route.addRoute('cost/index', () => {
        const indexView = new CostIndex();
        const controller = new CostController(indexView, route);

        controller.index();
    });

    route.addRoute('cost/create', () => {
        const createView = new CostShape();
        const controller = new CostController(createView, route);

        controller.create();
    });

    route.addRoute('cost/update', () => {
        const updateView = new CostShape();
        const controller = new CostController(updateView, route);

        controller.update();
    });

    route.addRoute('category/index', () => {
        const indexView = new CategoryIndex();
        const controller = new CategoryController(indexView, route);

        controller.index();
    });

    route.addRoute('category/create', () => {
        const createView = new CategoryShape();
        const controller = new CategoryController(createView, route);

        controller.create();
    });

    route.addRoute('category/update', () => {
        const updateView = new CategoryShape();
        const controller = new CategoryController(updateView, route);

        controller.update();
    });

    route.addRoute('balance/index', () => {
        const balanceView = new BalanceIndex();
        const controller = new BalanceController(balanceView, route);

        controller.index();
    });

    route.addRoute('balance/replenish', () => {
        const balanceReplenish = new BalanceReplenish();
        const controller = new BalanceController(balanceReplenish, route);

        controller.replenish();
    });

    route.routing();
});