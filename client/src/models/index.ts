import { Category, History, Store } from "@/types";
import cem from '../utils/custom-event';

class Model {
    store: Store = {};
    historyId:number = 1;
    constructor() {
        cem.subscribe('statepop', this.getData.bind(this));
        cem.subscribe('statechange', this.getData.bind(this));
        cem.subscribe('historycreate', this.createHistory.bind(this));
        cem.subscribe('historymodalgetdata',this.getModalData.bind(this));
    }

    getModalData(e: CustomEvent) {
        const {state, historyId} = e.detail;
        const {categories} = this.store;

        let history: History = this.store.histories.find(
            (history) => history.id === historyId
        );

        cem.fire('historymodalcreate',{
            state,
            store: {categories, history}
        });
    }

    getData(e: CustomEvent) {
        const {year, month, type} = e.detail;
        this.getCategories();
        this.getHistories();
        const store = {...this.store};

        if(type) {
            store.histories = store.histories.filter(
                (history) => history.type === type
            )
        }
        cem.fire('storeupdated', {state: e.detail, store});
    }

    getCategories() {
        this.store.categories = [
            {'id': 1, 'name':'월급', 'type':'income'},
            {'id': 2, 'name':'용돈', 'type':'income'},
            {'id': 3, 'name':'기타수입', 'type':'income'},
            {'id': 4, 'name':'식비', 'type':'expenditure'},
            {'id': 5, 'name':'생활', 'type':'expenditure'},
            {'id': 6, 'name':'쇼핑/뷰티', 'type':'expenditure'},
            {'id': 7, 'name':'교통', 'type':'expenditure'},
            {'id': 8, 'name':'의료/건강', 'type':'expenditure'},
            {'id': 9, 'name':'문화/여가', 'type':'expenditure'},
            {'id': 10, 'name':'미분류', 'type':'expenditure'}] as Category[];
    }

    getHistories() {
        this.initializeHistories();
    }

    createHistory(e: CustomEvent) {
        const {historyData, state} = e.detail;
        if(historyData.isThisMonth) {
            historyData.id = this.historyId++;
            this.store.histories.push(historyData);
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
            ? (incomeSum += history.amount)
            : (expenditureSum += history.amount)
        )

        this.store.incomeSum = incomeSum;
        this.store.expenditureSum = expenditureSum;
    }
}

export default Model;