"use strict"

export default class CostForm {
    constructor() {
        this.content = document.getElementById('content');
    }

    createForm() {
        return `
            <form id="form-cost" class="form-label mt-4">
                <div class="row">
                    <div class="col-2">
                        <input type="date" class="form-control" name="date">
                    </div>
                    <div class="col-2">
                        <input type="number" class="form-control" name="price" placeholder="price">
                    </div>
                    <div class="col-7">
                        <input type="text" class="form-control" name="description" placeholder="description">
                    </div>
                    <div class="col-1">
                        <button type="submit" id="btn-save" class="btn btn-primary w-100">Save</button>
                    </div>
                </div>
            </form>
        `;
    }

    render() {
        this.content.innerHTML = `${this.createForm()}`;
    }
}