"use strict"

import configs from "./routes";
export default class Model {
    constructor() {
        this.configs = configs;
    }

    setView(view) {
        this.view = view;
        return this;
    }

    // changeView(route) {
    //     this.config = this.configs[route];
    //
    //     switch (route) {
    //         case 'cost/index':
    //         case 'category/index':
    //             this.view.createTablePage(this.config);
    //             break;
    //
    //         case 'cost/create':
    //         case 'category/create':
    //             this.view.createFormPage(this.config);
    //             break;
    //
    //         default:
    //             throw new Error(route + 'route not found');
    //     }
    // }
}

