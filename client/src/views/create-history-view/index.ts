import { Category, History } from '@/types';
import cem from '../../utils/custom-event';
import './styles/index.scss';

export default class CreateHistory {

    categories: Category[];
    history: History;
    isClosing = false;
    
    constructor() {
        cem.subscribe('historymodalcreate', (e: CustomEvent) => {
            this.setAttributes(e.detail.store);
            this.render();
            const modal = document.querySelector('.modal');
            modal.addEventListener('click',this.clickEventHandler.bind(this));
            modal.addEventListener('keyup',this.keyupEventHandler.bind(this));
        })
    }

    getInputValue(selector: string): string {
        return (document.querySelector(selector) as HTMLInputElement)?.value; 
    }

    getNumber(str: string): number{
        return str ? Number(str.replace(/[^0-9]/g, '')) : undefined;
    }

    getElementId(selector: string): number {
        return this.getNumber((document.querySelector(selector) as HTMLElement)?.id);
    }

    getElementInnerText(selector: string): string {
        return (document.querySelector(selector)as HTMLElement).innerText;
    }

    isInputValidated(): boolean {
        const payment = this.getInputValue('.payment-input')
        const content = this.getInputValue('.content-input');
        const amount = this.getInputValue('.amount-input');
        return payment.length !==0 && content.length !==0 && amount.length !== 0;
    }

    keyupEventHandler(e:KeyboardEvent): void {
        const {target} = e;
        if(!(target instanceof HTMLElement)) return;
        const submitButton = document.querySelector('.submit-button') as HTMLInputElement;

        submitButton.disabled = !this.isInputValidated();
    }

    submissionHandler(target: HTMLElement) {
        
        if(target.className !== 'submit-button') return;
        
        const historyData: History = {
            id: this.history?.id,
            type: this.getElementInnerText('.type-picker .selected').toLowerCase(),
            date: `2021-08-09`,
            content: this.getInputValue('.content-input'),
            amount: +this.getInputValue('.amount-input'),
            payment: this.getInputValue('.payment-input'),
            categoryId: this.getElementId('.card-picker .selected'),
            isThisMonth: history.state.year === 2021 && history.state.month === 8
        };

        this.closeModal();
        cem.fire(this.history ? 'historyupdate': 'historycreate', {
            historyData,
            state: history.state
        });
    }

    closeModal() {
        if(this.isClosing) return;
        this.isClosing = true;
        const modal = document.querySelector<HTMLElement>('.modal');
        this.isClosing = false;
        modal.remove();
    }


    closeHandler(target: HTMLElement) {
        if(target.closest('.close-icon') || !target.closest('.history-form')) {
            this.closeModal();
        }
    }

    pickerHandler(
        target: HTMLElement,
        parentSelector: string,
        childSelector: string,
    ) : void {
        const indicator = target.closest(childSelector);
        if(!indicator) return;

        document
            .querySelector(`${parentSelector} .selected`)
            ?.classList.remove('selected');
        
        indicator.classList.toggle('selected');
    }

    typeChangeHandler(target: HTMLElement): void {
        const indicator = target.closest('.type-indicator');
        if(!indicator || !(indicator instanceof HTMLElement)) return;

        const type = indicator.innerText.toLowerCase();
        const categoryPicker = document.querySelector('.category-picker');
        categoryPicker.innerHTML = this.createCategoryIndicator(type);
    }

    clickEventHandler(e: MouseEvent) {
        e.preventDefault();
        const {target} = e;
        if(!(target instanceof HTMLElement)) 
            return;

        this.closeHandler(target);
        this.pickerHandler(target, '.type-picker', '.type-indicator');
        this.pickerHandler(target, '.category-picker', '.category-indicator');
        this.typeChangeHandler(target);
        this.submissionHandler(target);
    }

    

    render(): void {
        const historyComponent = document.querySelector('.history-view');
        historyComponent.innerHTML += this.createModal();
    }

    setAttributes({categories, history}) {
       this.categories = categories;
       this.history = history;
    }



    createTypePicker(selectedType = 'expenditure'): string {
        
        return `
            <div class='type-picker'>
                <div class='type-indicator income ${selectedType === 'income'? 'selected':''}'>Income</div>
                <div class='type-indicator expenditure ${selectedType === 'expenditure'? 'selected':''}'>Expenditure</div>
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
                            <input class='payment-input' maxlength='20' placeholder='Payment' name='payment' value=''>
                            <input class='content-input' maxlength='20' placeholder='Label' name='label' value=''>
                            <input class='amount-input' maxlength='7' placeholder='Amount' name='amount' value=''>
                        </div>
                        <div class='submit-button-wrap'>
                            <input class='submit-button' type='submit' value='Done' ${this.history ? '' : 'disabled'}>
                        </div>
                    </form
                </div>
            </div>
        `
    }
}