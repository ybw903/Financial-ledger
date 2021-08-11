import cem from '../../utils/custom-event';

export default class CalendarView {
    constructor() {
        cem.subscribe('storeupdated',(e:CustomEvent) => {
            if(e.detail.state.path !== '/calendar') return;
            this.render();
        })
    }

    render(): void {
        const contentWrap = document.querySelector('.content-wrap');
        contentWrap.innerHTML = `
            <div>
            </div>
        `
    }
}