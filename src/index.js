"use strict"

import './bootstrap.css';
import CostModel from "./model/Cost";
import CostController from "./controller/Cost";
import CostTable from "./view/CostTable";
import CostForm from "./view/CostForm";
import CategoryModel from "./model/Category";
import CategoryController from "./controller/Category";
import CategoryTable from "./view/CategoryTable";
import CategoryForm from "./view/CategoryForm";

let routes = {
    'cost': () => {
        const model = new CostModel();
        const controller = new CostController();
        const viewTable = new CostTable();
        const viewForm = new CostForm();

        controller.setModel(model).setViewTable(viewTable).setViewForm(viewForm);
        controller.route();
    },
    // 'category': () => {
    //     const model = new CategoryModel();
    //     const controller = new CategoryController();
    //     const viewTable = new CategoryTable();
    //     const viewForm = new CategoryForm();
    //
    //     model.setController(controller);
    //     controller.setModel(model).setViewTable(viewTable).setViewForm(viewForm);
    // }
};

function route() {
    const url = new URL(window.location.href);
    const action = url.searchParams.get('action') || 'cost/index';
    const entity = action.split('/')[0];
    const handler = routes[entity] || null;
    if (!handler) {
        throw new Error(action + " route not found");
    }
    handler();
}

const navLinks = document.getElementsByClassName('nav-link');
for (const navLink of navLinks) {
    navLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.history.pushState({}, "", e.target.href);

        route();
    })
}

document.addEventListener('DOMContentLoaded', route);
