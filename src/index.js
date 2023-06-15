"use strict"

import './bootstrap.css';
import Route from "./framework/Route";
import CostController from "./controller/CostController";
import CostTable from "./view/CostTable";
import CostForm from "./view/CostForm";
import CategoryController from "./controller/CategoryController";
import CategoryTable from "./view/CategoryTable";
import CategoryForm from "./view/CategoryForm";
import BalanceController from "./controller/BalanceController";
import BalanceIndex from "./view/BalanceIndex";
import BalanceReplenish from "./view/BalanceReplenish";


document.addEventListener('DOMContentLoaded', () => {
    const route = new Route();

    route.addRoute('cost/index', () => {
        const indexView = new CostTable();
        const controller = new CostController(indexView, route);

        controller.index();
    });

    route.addRoute('cost/create', () => {
        const createView = new CostForm();
        const controller = new CostController(createView, route);

        controller.create();
    });

    route.addRoute('cost/update', () => {
        const updateView = new CostForm();
        const controller = new CostController(updateView, route);

        controller.update();
    });

    route.addRoute('category/index', () => {
        const indexView = new CategoryTable();
        const controller = new CategoryController(indexView, route);

        controller.index();
    });

    route.addRoute('category/create', () => {
        const createView = new CategoryForm();
        const controller = new CategoryController(createView, route);

        controller.create();
    });

    route.addRoute('category/update', () => {
        const updateView = new CategoryForm();
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

    route.route();
});