"use strict"

import './bootstrap.css';
import Route from "./framework/Route";
import ServiceLocator from "./framework/ServiceLocator";
import DefaultIndexedDB from "./DefaultIndexedDB";

import CostController from "./controller/CostController";
import CostIndex from "./view/cost/CostIndex";
import CostCreate from "./view/cost/CostCreate";
import CostUpdate from "./view/cost/CostUpdate";
import CostDelete from "./view/cost/CostDelete";

import CategoryController from "./controller/CategoryController";
import CategoryIndex from "./view/category/CategoryIndex";
import CategoryCreate from "./view/category/CategoryCreate";
import CategoryUpdate from "./view/category/CategoryUpdate";
import CategoryDelete from "./view/category/CategoryDelete";

import BalanceController from "./controller/BalanceController";
import BalanceIndex from "./view/balance/BalanceIndex";
import BalanceReplenish from "./view/balance/BalanceReplenish";
import BalanceHistory from "./view/balance/BalanceHistory";
import HistoryBalanceChangeDelete from "./view/balance/HistoryBalanceChangeDelete";

document.addEventListener('DOMContentLoaded', async () => {
    await ServiceLocator.set('Default', await DefaultIndexedDB.getInstance());

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

    route.addRoute('cost/delete', async () => {
        const deleteView = new CostDelete(route);
        const controller = new CostController(deleteView, route);

        await controller.delete();
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

    route.addRoute('category/delete', async () => {
        const deleteView = new CategoryDelete(route);
        const controller = new CategoryController(deleteView, route);

        await controller.delete();
    });

    route.addRoute('balance/index', async () => {
        const balanceView = new BalanceIndex(route);
        const controller = new BalanceController(balanceView, route);

        await controller.index();
    });

    route.addRoute('balance/replenish', async () => {
        const replenishView = new BalanceReplenish(route);
        const controller = new BalanceController(replenishView, route);

        await controller.replenish();
    });

    route.addRoute('balance/history', async () => {
        const historyView = new BalanceHistory(route);
        const controller = new BalanceController(historyView, route);

        await controller.history();
    });

    route.addRoute('history/delete', async () => {
        const deleteView = new HistoryBalanceChangeDelete(route);
        const controller = new BalanceController(deleteView, route);

        await controller.deleteHistoryChange();
    });

    route.routing();
});