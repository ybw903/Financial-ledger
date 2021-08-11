import './styles/index.scss'
import cem from '../../utils/custom-event';
import { WindowHistoryState } from '@/types';
import { dommer, monthStr } from '../../utils/helper';

export default class Header {
    
    state: WindowHistoryState;
    incomeSum: number;
    expenditureSum: number;

    constructor() {
        const header = document.querySelector('header');
        header.addEventListener('click',this.clickEventHanlder.bind(this));
        cem.subscribe('storeupdated',(e: CustomEvent) => {
            this.setAttributes(e.detail);
            this.render();
        });

    }

    setAttributes({state, store}):void {
        this.state = state;
        this.expenditureSum = store.expenditureSum;
        this.incomeSum = store.incomeSum;
    }

    render():void {
        document.querySelector('header').innerHTML=`
            ${this.createNavigator()}
            ${this.createMonthSelector()}
            ${this.createSumIndicator()}
        `;
    }

    clickEventHanlder(e: MouseEvent) {
        e.preventDefault();

        const {target} = e;
        if(!(target instanceof HTMLElement)) return;
        this.shaderClickHandler(target);
    }

    shaderClickHandler(target: HTMLElement):void {
        const shader = target.closest<HTMLElement>('.shader');

        if(!shader) return;

        const toRight = shader.classList.contains('left');
        
        const transform = `translateX(${(( toRight ? +1: -1) * 100)/3}%)`

        const monthSelector = shader.parentElement.querySelector<HTMLElement>('.month-selector');

        monthSelector.style.transform = transform;

        const state = history.state as WindowHistoryState;

        const caculatedAppearingMonth = state.month + (toRight ? -2 : 2);

        const destinationMonth = toRight
            ? state.month - 1 < 1
                ? 12
                : state.month - 1
            : state.month + 1 >12
                ? 1
                : state.month + 1;
        
        const destinationYear = toRight
            ? state.month - 1 < 1
                ? state.year - 1
                : state.year
            : state.month + 1 > 12
                ? state.year + 1
                : state.year;
        
        // -1: previous year
        // 0: current year
        // 1: next year
        const overflowFlag: -1|0|1 =
            caculatedAppearingMonth > 12 ? 1 : caculatedAppearingMonth <1 ? -1 : 0;
        
        const appearingMonth =
            overflowFlag === 1
                ? caculatedAppearingMonth - 12
                : overflowFlag === -1
                    ? caculatedAppearingMonth +12
                    : caculatedAppearingMonth;
        
        const appearingYear = state.year + overflowFlag;

        const appearingMonthIndicator = dommer(
            this.craeteMonthIndicator(appearingYear,appearingMonth)
        ).firstElementChild as HTMLElement;
        
        appearingMonthIndicator.style.position = 'absolute';
        appearingMonthIndicator.style.width = 100 / 3 + '%';

        if(toRight) {
            appearingMonthIndicator.style.right = '100%';
        } else {
            appearingMonthIndicator.style.left = '100%'
        }

        const method = toRight ? 'prepend' : 'append';

        monthSelector[method](appearingMonthIndicator);

        shader.classList.add('forcedly-shaded');

        monthSelector.addEventListener('transitionend', () => {
            cem.fire('statechange', {
                ...state,
                year: destinationYear,
                month: destinationMonth
            })
        })
    }

    createNavigator():string {
        return `
            <nav>
                <div class='icon-wrap'>
                    다시 불러오기 버튼
                </div>
                <div class='separator'></div>
                <div class='icon-wrap'>
                    시계버튼
                </div>
                <div class='icon-wrap'>
                    달력버튼
                </div>
                <div class='icon-wrap'>
                    차트버튼
                </div>
            </nav>
        `
    }
    createMonthSelector():string {
        const {year, month} = this.state;
        const prevYear = month === 1? year-1: year;
        const prevMonth = month === 1? 12 : month-1;
        const nextYear = month === 12? year+1: year;
        const nextMonth = month === 12? 1: month+1;
        return `
            <div class='month-selector-wrapper'>
                <div class='month-selector'>
                    ${this.craeteMonthIndicator(prevYear,prevMonth)}
                    ${this.craeteMonthIndicator(year,month)}
                    ${this.craeteMonthIndicator(nextYear,nextMonth)}
                </div>
                <div class='shader left'> </div>
                <div class='shader right'></div>
            </div>
        `
    }

    craeteMonthIndicator(year: number, month: number):string {
        return `
            <div class='month-indicator'>
                <div class='year'>${year}</div>
                <div class='month'>${monthStr[month]}</div>
            </div>
        `
    }

    createSumIndicator(): string {
        return `
            <div class='sum-indicator-wrap'>
                <div class='sum-indicator'>
                    <div class='money-button income ${this.state.type && this.state.type == 'income' ? 'selected': ''}'>
                        +${this.incomeSum}
                    </div>
                    <div class='money-button expenditure ${this.state.type && this.state.type == 'expenditure' ? 'selected': ''}'>
                        -${this.expenditureSum}
                    </div>
                </div>
            </div>
        `
    }
}