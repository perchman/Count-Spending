"use strict"

export default class Controller {
    constructor() {}

    setRoute(route) {
        this.route = route;
    }

    addEventsToNavbarButtons() {
        const navLinks = document.getElementsByClassName('nav-link');
        for (const navLink of navLinks) {
            navLink.addEventListener('click', (e) => {
                e.preventDefault();
                window.history.pushState({}, "", e.target.href);
            });
        }

        this.route.route();
    }

    addEventToAddButton() {
        const addButton = document.getElementById('btn-add');
        addButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.history.pushState({}, "", e.target.href);

            this.route.route();
        });
    }

    addEventsToUpdateButtons() {
        const updateButtons = document.getElementsByClassName('btn-update');
        for (const button of updateButtons) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                window.history.pushState({}, "", e.target.href);

                this.route.route();
            })
        }
    }

    addEventsToDeleteButtons() {
        const deleteButtons = document.getElementsByClassName('btn-delete');
        for (const button of deleteButtons) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                window.history.pushState({}, "", e.target.href);

                this.route.route();
            })
        }
    }

    redirect(url) {
        window.addEventListener('popstate', (e) => this.route());
        window.history.pushState({}, "", url);
        window.dispatchEvent(new Event('popstate'));
    }
}