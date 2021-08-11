import { History, WindowHistoryState } from '@/types';
import cem from '../../utils/custom-event';

export default class CalendarView {

    state: WindowHistoryState;
    histories: History[];
    historiesByDate: object;

    constructor() {
        cem.subscribe('storeupdated',(e:CustomEvent) => {
            if(e.detail.state.path !== '/calendar') return;
            this.setAttributes(e.detail);
            this.render();
        })
    }

    setAttributes({state, store}): void {
        const {histories} = store;
        this.state = state;
        this.histories = histories;
    }

    render(): void {
        const contentWrap = document.querySelector('.content-wrap');
        contentWrap.innerHTML = `
            <div>
            </div>
        `
    }

}