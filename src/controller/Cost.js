"use strict"

export default class Cost {
    constructor() {}

    setModel(model) {
        this.model = model;
        return this;
    }

    setView(viewTable, viewForm) {
        this.viewTable = viewTable;
        this.viewForm = viewForm;
        return this;
    }

    setURL(url) {
        this.url = url;
        return this;
    }

    gatherCostIndex() {
        const url = new URL(window.location.href);
        const sort = url.searchParams.get('sort') || `date_desc`;
        const sortKey = sort.split('_')[0];
        const sortDirection = sort.split('_')[1];
        const pageNum = url.searchParams.get('page') || 1;
        this.viewTable.render(this.model.getData(pageNum, sortKey, sortDirection));
        this.addEvents();
    }

    addEvents() {
        this.addEventToAddButton();
        this.addEventsToUpdateButtons();
        this.addEventsToDeleteButtons();
    }



    gatherCostCreate() {
        this.viewForm.render();

        const form = document.getElementById('form-cost');
        form.addEventListener('click', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            this.model.createCost(formData);

            this.redirect('?action=cost/index');
        })
    }

    gatherCostUpdate() {
        this.viewForm.render();

        const url = new URL(window.location.href);
        const id = url.searchParams.get('id');
        let cost = this.model.getCostById(id);

        const form = document.getElementById('form-cost');
        form.elements['date'].value = new Date(cost.date).toISOString().split('T')[0];
        form.elements['price'].value = cost.price;
        form.elements['description'].value = cost.description;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            this.model.updateCost(formData, id);

            this.redirect('?action=cost/index');
        })
    }


}
