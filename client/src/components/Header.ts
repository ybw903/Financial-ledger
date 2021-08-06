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
                <div>
                    다시 불러오기 버튼
                </div>
                <div>
                    시계버튼
                </div>
                <div>
                    달력버튼
                </div>
                <div>
                    차트버튼
                </div>
            </nav>
        `
    }
    createMonthSelector():string {
        return `
            <div>
                <div>
                    ${this.craeteMonthIndicator(2021,7)}
                    ${this.craeteMonthIndicator(2021,8)}
                    ${this.craeteMonthIndicator(2021,9)}
                </div>
                <div></div>
                <div></div>
            </div>
        `
    }

    craeteMonthIndicator(year: number, month: number):string {
        return `
            <div>
                <div>${year}</div>
                <div>${month}</div>
            <div>
        `
    }

    createSumIndicator(): string {
        return `
            <div>
                <div>
                    <div>
                        +
                    </div>
                    <div>
                        -
                    </div>
                </div>
            </div>
        `
    }
}