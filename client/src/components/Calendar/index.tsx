import * as React from 'react'
import {
  CalendarBody,
  CalendarHeader,
  CalendarSection,
  DateCell,
  DateIndicator,
  DayIndicator,
  SumIndicator,
} from './index.style'
import { dayStr } from '../../utils'
import data from '../../data/data.json'

interface ICalendar {
  date: Date
  isOpen: boolean
  setDate: React.Dispatch<React.SetStateAction<Date>>
}

interface ICalendarDate {
  isInMonth: boolean
  dateNumber: number
  isToday: boolean
  expenditureSum: number
  incomeSum: number
}

const Calendar: React.FC<ICalendar> = (props) => {
  const [calendarDate, setCalendarDate] = React.useState<ICalendarDate[]>([])

  const drawCalendarHeader = () => {
    return dayStr.map((day, i) => {
      return (
        <DayIndicator key={i} isHoliday={i === 0}>
          {day}
        </DayIndicator>
      )
    })
  }

  const cellClickHandler = (
    evt: React.MouseEvent<HTMLDivElement, MouseEvent>,
    dateNumber: number
  ) => {
    const nextDate = new Date(
      props.date.getFullYear(),
      props.date.getMonth(),
      dateNumber
    )
    console.log(nextDate)
    props.setDate((prev) => nextDate)
  }

  const drawCalendarBody = () => {
    return calendarDate.map((date, i) => {
      return (
        <DateCell
          key={i}
          isToday={date.isToday}
          onClick={(evt) => cellClickHandler(evt, date.dateNumber)}
        >
          <DateIndicator isInMonth={date.isInMonth}>
            {date.dateNumber}
          </DateIndicator>
          {date.expenditureSum ? (
            <SumIndicator isExpenditure={true}>
              -{date.expenditureSum}
            </SumIndicator>
          ) : (
            <></>
          )}
        </DateCell>
      )
    })
  }

  const getNewCalendarDate = React.useCallback(() => {
    const newCalendarDate: ICalendarDate[] = []
    const thisMonthStartDay = new Date(
      props.date.getFullYear(),
      props.date.getMonth(),
      1
    ).getDay()
    const thisMonthEndDate = new Date(
      props.date.getFullYear(),
      props.date.getMonth() + 1,
      0
    ).getDate()
    const lastMonthEndDate = new Date(
      props.date.getFullYear(),
      props.date.getMonth() + 1,
      0
    ).getDate()
    const lastMonthStartDate = lastMonthEndDate - thisMonthStartDay + 1

    for (let i = 0; i < thisMonthStartDay; i++) {
      const date = i + lastMonthStartDate
      newCalendarDate.push({
        dateNumber: date,
        isInMonth: false,
        isToday: false,
        incomeSum: 0,
        expenditureSum: 0,
      })
    }
    for (let i = 0; i < thisMonthEndDate; i++) {
      const date = i + 1
      const expenditureSum = data.spends
        .filter((spend) => {
          const spendDate = new Date(spend.date)
          const todayDate = new Date()
          return (
            spendDate.getFullYear() === todayDate.getFullYear() &&
            spendDate.getMonth() === todayDate.getMonth() &&
            spendDate.getDate() === date &&
            spend.type === 'EXPENDITURE'
          )
        })
        .reduce((acc, cur, idx) => (acc += cur.money), 0)
      const incomeSum = data.spends
        .filter((spend) => {
          const spendDate = new Date(spend.date)
          const todayDate = new Date()
          return (
            spendDate.getFullYear() === todayDate.getFullYear() &&
            spendDate.getMonth() === todayDate.getMonth() &&
            spendDate.getDate() === date &&
            spend.type === 'INCOME'
          )
        })
        .reduce((acc, cur, idx) => (acc += cur.money), 0)

      newCalendarDate.push({
        dateNumber: date,
        isInMonth: true,
        isToday: date === props.date.getDate(),
        incomeSum: incomeSum,
        expenditureSum: expenditureSum,
      })
    }
    const neededCellCnt = 42 - newCalendarDate.length

    for (let i = 0; i < neededCellCnt; i++) {
      const date = i + 1
      newCalendarDate.push({
        dateNumber: date,
        isInMonth: false,
        isToday: false,
        incomeSum: 0,
        expenditureSum: 0,
      })
    }

    return newCalendarDate
  }, [props.date])

  React.useEffect(() => {
    setCalendarDate((prev) => [...getNewCalendarDate()])
  }, [props.date, getNewCalendarDate])

  return (
    <CalendarSection isOpen={props.isOpen}>
      <CalendarHeader>{drawCalendarHeader()}</CalendarHeader>
      <CalendarBody>{drawCalendarBody()}</CalendarBody>
    </CalendarSection>
  )
}

export default Calendar
