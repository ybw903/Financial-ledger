import { CalendarDayDate, History, WindowHistoryState } from '@/types';
import { groupBy } from '@/utils/helper';
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

    getEmptyCellData(date: number): CalendarDayDate {
        return {
            incomeSum: 0,
            expenditureSum: 0,
            date,
            isHoliday: false,
            isInThisMonth: false
        };
    }

    sum = <T>(objArr: object[], prop: string, initialValue: T): T => {
        return objArr.reduce((sum,item) => sum + item[prop], initialValue);
    }

    getTypeSum(histories: History[], type: 'expenditure' | 'income'):number {
        return this.sum(
            histories.filter((history) => history.type === type),
            'amount',
            0
        );
    }

    addLeadingZeros(number: number, length:number) {
        let s = number.toString();
        while(s.length < length) s = '0' + s;
        return s;
    }

    getDateIndex = (year: number, month: number, day:number):string =>
        `${year}-${this.addLeadingZeros(month,2)}-${this.addLeadingZeros(day,2)}`

    getCalendarData() {
        const year = this.state.year;
        const month = this.state.month - 1;
        const calendarData: CalendarDayDate[] = [];
        const historiesByDate = groupBy(this.histories, 'date');
        const thisMonthStartDay = new Date(year, month, 1).getDay();
        const thisMonthEndDate = new Date(year, month+1, 0).getDate();
        const lastMonthEndDate = new Date(year, month, 0).getDate();
        const lastMonthStartDate = lastMonthEndDate - thisMonthStartDay +1;

        this.historiesByDate = historiesByDate;

        for (let i = 0; i < thisMonthStartDay; i++) {
            const date = i + lastMonthStartDate;
            calendarData.push(this.getEmptyCellData(date));
        }

        for (let i = 0; i < thisMonthEndDate; i++) {
            const date = i + 1;
            const dateIndex = this.getDateIndex(year, month+1, date);
            const histories = historiesByDate[dateIndex] ?? [];

            calendarData.push({
                date,
                isInThisMonth: true,
                isHoliday: false,
                expenditureSum: this.getTypeSum(histories, 'expenditure'),
                incomeSum: this.getTypeSum(histories, 'income')
            });
        }

        const neededCellCnt = 42 - calendarData.length;
        for (let i = 0; i < neededCellCnt; i++) {
            const date = i + 1;
            calendarData.push(this.getEmptyCellData(date));
        }

        calendarData
            .filter((data, index) => index % 7 === 0)
            .forEach((data) => (data.isHoliday = true));
        
        return calendarData;
    }
}