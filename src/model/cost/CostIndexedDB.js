"use strict"

import Balance from "../balance/BalanceIndexedDB";
import IndexedDBActiveRecordModel from "../../framework/IndexedDBActiveRecordModel";

export default class CostIndexedDB extends IndexedDBActiveRecordModel {

    static getDatabaseName() {
        return 'Default';
    }

    async save() {
        const isNew = !this.id;

        const storeNames = [
            this.constructor.getStoreName(),
            Balance.getStoreName()
        ]

        const database = await this.constructor.getDatabase();
        const transaction = database.transaction(storeNames, 'readwrite');
        const costStore = transaction.objectStore(storeNames[0]);
        const balanceStore = transaction.objectStore(storeNames[1]);

        await super.save(costStore);

        const balance = new Balance();

        if (isNew) {
            await balance.decrease(this.price, balanceStore);
        } else {
            if (this.initData.price < this.price) {
                await balance.decrease(this.price - this.initData.price, balanceStore);
            } else {
                await balance.increase(this.initData.price - this.price, balanceStore);
            }
        }
    }
}