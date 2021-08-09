import { Category } from '@/types';
import './styles/index.scss'

export default class CreateHistory {

    categories: Category[];
    isClosing = false;
    
    constructor() {
        this.setAttributes();
        this.render();
        const modal = document.querySelector('.modal');
        modal.addEventListener('click',this.clickEventHandler.bind(this));
    }

    render(): void {
        const historyComponent = document.querySelector('.history-view');
        historyComponent.innerHTML += this.createModal();
    }

    setAttributes() {
        this.categories = [
            {'id': 1, 'name':'월급', 'type':'income'},
            {'id': 2, 'name':'용돈', 'type':'income'},
            {'id': 3, 'name':'기타수입', 'type':'income'},
            {'id': 4, 'name':'식비', 'type':'expenditure'},
            {'id': 5, 'name':'생활', 'type':'expenditure'},
            {'id': 6, 'name':'쇼핑/뷰티', 'type':'expenditure'},
            {'id': 7, 'name':'교통', 'type':'expenditure'},
            {'id': 8, 'name':'의료/건강', 'type':'expenditure'},
            {'id': 9, 'name':'문화/여가', 'type':'expenditure'},
            {'id': 10, 'name':'미분류', 'type':'expenditure'}]
    }


    closeModal() {
        if(this.isClosing) return;
        this.isClosing = true;
        const modal = document.querySelector<HTMLElement>('.modal');
        this.isClosing = false;
        modal.remove();
    }

    clickEventHandler(e: MouseEvent) {
        e.preventDefault();
        
        const {target} = e;
        if(!(target instanceof HTMLElement)) 
            return;

        this.closeHandler(target);
    }

    closeHandler(target: HTMLElement) {
        if(target.closest('.close-icon') || !target.closest('.history-form')) {
            this.closeModal();
        }
    }


    createTypePicker(selectedType = 'expenditure'): string {
        return `
            <div class='type-picker'>
                <div class='type-indicator income'>Income</div>
                <div class='type-indicator expenditure'>Expenditure</div>
            </div>
        `
    }

    createCategoryIndicator(type = 'expenditure', categoryId?: number): string {
        
        return `
            ${
                this.categories
                .filter((category) => category.type === type)
                .map((category,index)=> 
                    `
                        <div class='category-indicator ${                    
                            categoryId
                            ? category.id === categoryId
                                ? 'selected'
                                : ''
                            : index === 0
                                ? 'selected'
                                : ''
                        }' id='category-${category.id}'>
                            ${category.name}
                        </div>
                    `
                ).reduce((a:string, b:string)=> a+b,'')
            }
        `
    }

    createModal():string {
        return `
            <div class='modal'>
                <div class='history-form-wrap'>
                    <form class='history-form'>
                        <div class='icon-wrap'>
                            <i class='icon close-icon'>X</i>
                        </div>
                        ${this.createTypePicker()}
                        <div class='date-picker'>
                            2021.08.09
                        </div>
                        <div class='category-picker'>
                            ${this.createCategoryIndicator()}
                        </div>
                        <div class='input-wrap'>
                            <input class='content-input' maxlength='20' placeholder='Payment' name='payment' value=''>
                            <input class='content-input' maxlength='20' placeholder='Label' name='label' value=''>
                            <input class='content-input' maxlength='7' placeholder='Amount' name='amount' value=''>
                        </div>
                        <div class='submit-button-wrap'>
                            <input class='submit-button' type='submit' value='Done' disabled>
                        </div>
                    </form
                </div>
            </div>
        `
    }
}