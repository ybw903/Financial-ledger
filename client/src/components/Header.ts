export default class Header {
    constructor() {
        const header = document.querySelector('header');
        this.render();
    }

    render():void {
        document.querySelector('header').innerHTML=`
            ${this.createNavigator()}
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
}