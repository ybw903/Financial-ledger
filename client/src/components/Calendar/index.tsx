import * as React from 'react'
import {
  CalendarBody,
  CalendarHeader,
  CalendarSection,
  DateCell,
  DateIndicator,
  DayIndicator,
} from './index.style'
import { dayStr } from '../../utils'

interface ICalendar {
  date: Date
  isOpen: boolean
}

interface ICalendarDate {
  isInMonth: boolean
  dateNumber: number
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

  const drawCalendarBody = () => {
    return calendarDate.map((date, i) => {
      return (
        <DateCell key={i}>
          <DateIndicator isInMonth={date.isInMonth}>
            {date.dateNumber}
          </DateIndicator>
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
      newCalendarDate.push({ dateNumber: date, isInMonth: false })
    }
    for (let i = 0; i < thisMonthEndDate; i++) {
      const date = i + 1
      newCalendarDate.push({ dateNumber: date, isInMonth: true })
    }
    const neededCellCnt = 42 - newCalendarDate.length

    for (let i = 0; i < neededCellCnt; i++) {
      const date = i + 1
      newCalendarDate.push({ dateNumber: date, isInMonth: false })
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
