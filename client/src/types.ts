export interface Category {
    id: number
    name: string
    type: string
}


export interface CalanderDayDate {
    date: number
    isInThisMonth: boolean
    isHoliday: boolean
    incomeSum: number
    expenditureSum: number
}

export interface History {
    id?: number
    type: string
    date: string
    content: string
    amount: number
    payment: string
    categoryId?: number
    isThisMonth?: boolean
}

export interface Store {
    categories?: Category[]
    histories?: History[]
    expenditureSum?: number
    incomeSum?: number
}



export type WindowHistoryState = {
    path?: string
    year?: number
    month?: number
    type?: string
}