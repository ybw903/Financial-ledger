import CreateHistory from '../create-history';
import './styles/index.scss';

export default class History {

    histories: History[];
    createHistoryComponentRender: any;

    constructor() {

        this.render();
        
        const historyComponent = document.querySelector('.history-view');
        historyComponent.addEventListener('click', this.createHistoryButtonClickHandler.bind(this));
    }


    createHistoryButtonClickHandler(e: MouseEvent) {
        e.preventDefault();
        const {target} = e;
        if(!(target instanceof HTMLElement))
            return;
        if(!target.closest('.float')) 
            return;

        e.stopImmediatePropagation();
        new CreateHistory();
    }

    render():void {
        const histoiesByDate = this.groupBy([{'date':3},{'date':4}], 'date')
        const contentWrap = document.querySelector('.content-wrap');
        contentWrap.innerHTML = `
            <div class='history-view'>
                ${Object.keys(histoiesByDate)
                    .sort()
                    .reverse()
                    .reduce(
                        (a:string, b: string )=> a+ this.createDateColumn(b, histoiesByDate[b]),
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
        return `<div>${this.dateWithDay(date)}</div>`
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

    dayStr = ['SUN','MON','TUE','WED','THU','FRI','SAT']

    dateWithDay(dateStr: string): string {
        const dateObj = new Date(dateStr);
        const day = dateObj.getDay();
        const date = dateObj.getDate();
        let dateExtension = 'th';
        if(date == 1) {
            dateExtension = 'st';
        }
        else if(date == 2) {
            dateExtension = 'nd';
        }
        else if(date == 3) {
            dateExtension = 'rd';
        }
        return `${this.dayStr[day]}, ${date}${dateExtension}`
    }

    groupBy(objArr: {}[], key: string):object {
        return objArr.reduce((a,b) => {
            a[b[key]] = a[b[key]]??[];
            a[b[key]].push(b);
            return a;
        },{});
    }
}