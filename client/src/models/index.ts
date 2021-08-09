import { Store } from "@/types";
import cem from '../utils/custom-event';

class Model {
    store: Store = {};

    constructor() {
        cem.subscribe('statepop', this.getData.bind(this));
        cem.subscribe('statechange', this.getData.bind(this));
        cem.subscribe('historycreate', this.createHistory.bind(this));
    }

    getData(e: CustomEvent) {
        const store = {...this.store};
        cem.fire('storeupdated', {state: e.detail, store});
    }

    createHistory(e: CustomEvent) {
        const {history, state} = e.detail;
        
        if(history.isThisMonth) {
            this.store.histories.push(history);
            this.initializeHistories();
            cem.fire('storeupdated',{state,store: this.store});
        }
    }

    initializeHistories() {
        let expenditureSum = 0, incomeSum =0;
        if(!this.store.histories) {
            this.store.histories = [];
        }

        this.store.histories.forEach((history) =>
            history.type === 'income'
            ? (incomeSum += history.amout)
            : (expenditureSum += history.amout)
        )

        this.store.incomeSum = incomeSum;
        this.store.expenditureSum = expenditureSum;
    }
}

export default Model;