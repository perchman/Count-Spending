"use strict"

import CostModel from "../model/Cost";
import CostController from "../controller/Cost";
import CostTable from "../view/CostTable";
import CostForm from "../view/CostForm";
import CategoryModel from "../model/Category";
import CategoryController from "../controller/Category";
import CategoryTable from "../view/CategoryTable";
import CategoryForm from "../view/CategoryForm";

export default class Route {
    constructor() {
        this.routes = {
            'cost/index': () => {
                const model = new CostModel();
                const controller = new CostController();
                const view = new CostTable();

                controller.setModel(model);
                controller.setView(view);
                controller.gatherCostIndex();
            },
            'cost/create': () => {
                const model = new CostModel();
                const controller = new CostController();
                const view = new CostForm();

                controller.setModel(model);
                controller.setView(view);
                controller.gatherCostCreate();
            },
            'cost/update': () => {
                const model = new CostModel();
                const controller = new CostController();
                const view = new CostForm();

                controller.setModel(model);
                controller.setView(view);
                controller.gatherCostUpdate();
            }
        }
    }

    route() {
        const url = new URL(window.location.href);
        const action = url.searchParams.get('action');
        const handler = this.routes[action];
        if (!handler) {
            throw new Error(action + "route not found");
        }
        handler();
    }
}