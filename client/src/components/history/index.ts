import { Category, WindowHistoryState } from '@/types';
import { dateWithDay, groupBy } from '../../utils/helper';
import CreateHistory from '../create-history';
import cem from '../../utils/custom-event';
import './styles/index.scss';

export default class History {

    state: WindowHistoryState;
    histories: History[];
    categories: Category[];
    createHistoryComponentRender: any;

    constructor() {
        cem.subscribe('storeupdated', (e:CustomEvent)=> {
            if(e.detail.state.path !== '/') return;
            this.setAttributes(e.detail);
            this.render();

            const historyComponent = document.querySelector('.history-view');
            historyComponent.addEventListener('click', this.createHistoryButtonClickHandler.bind(this));
        })
    }

    setAttributes({state,store}):void {
        const {histories, categories} = store;
        this.state= state;
        this.histories = histories;
        this.categories = categories;
    }

    createHistoryButtonClickHandler(e: MouseEvent) {
        e.preventDefault();
        const {target} = e;
        if(!(target instanceof HTMLElement))
            return;
        if(!target.closest('.float')) 
            return;
        
        e.stopImmediatePropagation();
        cem.fire('historymodalgetdata',{state:this.state});

    }

    render():void {
        const historiesByDate = groupBy(this.histories, 'date');
        const contentWrap = document.querySelector('.content-wrap');
        contentWrap.innerHTML = `
            <div class='history-view'>
                ${Object.keys(historiesByDate)
                    .sort()
                    .reverse()
                    .reduce(
                        (a:string, b: string )=> a+ this.createDateColumn(b, historiesByDate[b]),
                        ''
                    )
                }
                ${this.createFloationButton()}
            </div>
        `
    }

    createDateColumn(date: string, histories: History[]): string {
        return `
            <div>
                ${this.createDateIndicator(date)}
                ${histories.reduce(
                    (a: string, b: History) => a + this.createHistoryCard(b),
                    ''
                )}
            </div>
        `
    }

    createDateIndicator(date: string): string {
        return `<div>${dateWithDay(date)}</div>`
    }

    createHistoryCard(history: History): string {
        return `
            <div>
                <div>
                    <div>
                    </div>
                    <div></div>
                </div>
                <div>
                    <div>
                    </div>
                </div>
            </div>
        `
    }

    createFloationButton(): string {
        return `
            <div class='float'>
                <i class='icon'></i>
                <div class='text'>Add History</div>
            </div>
        `
    }

}