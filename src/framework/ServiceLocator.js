"use strict"

export default class ServiceLocator {
    static instances = {};
    static set(name, instance) {
        this.instances[name] = instance;
    }

    static get(name) {
        if (this.instances.hasOwnProperty(name)) {
            return this.instances[name];
        }

        throw new Error('Object not found');
    }
}