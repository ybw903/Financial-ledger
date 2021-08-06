import './styles/index.scss'
export default class Header {
    
    constructor() {
        const header = document.querySelector('header');
        this.render();
    }

    render():void {
        document.querySelector('header').innerHTML=`
            ${this.createNavigator()}
            ${this.createMonthSelector()}
            ${this.createSumIndicator()}
        `;
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
        return `
            <div class='month-selector-wrapper'>
                <div class='month-selector'>
                    ${this.craeteMonthIndicator(2021,7)}
                    ${this.craeteMonthIndicator(2021,8)}
                    ${this.craeteMonthIndicator(2021,9)}
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
                <div class='month'>${month}</div>
            </div>
        `
    }

    createSumIndicator(): string {
        return `
            <div class='sum-indicator-wrap'>
                <div class='sum-indicator'>
                    <div class='money-button income'>
                        +
                    </div>
                    <div class='money-button expenditure'>
                        -
                    </div>
                </div>
            </div>
        `
    }
}