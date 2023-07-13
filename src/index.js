"use strict"

import './bootstrap.css';
import Route from "./framework/Route";
import CostController from "./controller/CostController";
import CostIndex from "./view/cost/CostIndex";
import CostCreate from "./view/cost/CostCreate";
import CostUpdate from "./view/cost/CostUpdate";
import CategoryController from "./controller/CategoryController";
import CategoryIndex from "./view/category/CategoryIndex";
import CategoryCreate from "./view/category/CategoryCreate";
import CategoryUpdate from "./view/category/CategoryUpdate";
import BalanceController from "./controller/BalanceController";
import BalanceIndex from "./view/balance/BalanceIndex";
import BalanceReplenish from "./view/balance/BalanceReplenish";
import ServiceLocator from "./framework/ServiceLocator";
import DefaultIndexedDB from "./DefaultIndexedDB";

document.addEventListener('DOMContentLoaded', async () => {
    ServiceLocator.set('Default', await DefaultIndexedDB.getInstance());

    const route = new Route();

    route.addRoute('cost/index', async () => {
        const indexView = new CostIndex(route);
        const controller = new CostController(indexView, route);

        await controller.index();
    });

    route.addRoute('cost/create', async () => {
        const createView = new CostCreate(route);
        const controller = new CostController(createView, route);

        await controller.create();
    });

    route.addRoute('cost/update', async () => {
        const updateView = new CostUpdate(route);
        const controller = new CostController(updateView, route);

        await controller.update();
    });

    route.addRoute('category/index', async () => {
        const indexView = new CategoryIndex(route);
        const controller = new CategoryController(indexView, route);

        await controller.index();
    });

    route.addRoute('category/create', async () => {
        const createView = new CategoryCreate(route);
        const controller = new CategoryController(createView, route);

        await controller.create();
    });

    route.addRoute('category/update', async () => {
        const updateView = new CategoryUpdate(route);
        const controller = new CategoryController(updateView, route);

        await controller.update();
    });

    route.addRoute('balance/index', async () => {
        const balanceView = new BalanceIndex(route);
        const controller = new BalanceController(balanceView, route);

        await controller.index();
    });

    route.addRoute('balance/replenish', async () => {
        const balanceReplenish = new BalanceReplenish(route);
        const controller = new BalanceController(balanceReplenish, route);

        await controller.replenish();
    });

    route.routing();
});