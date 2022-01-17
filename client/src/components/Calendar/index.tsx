import * as React from 'react'
import { CalendarHeader, DayIndicator } from './index.style'
interface ICalendar {
  date: Date
}

const Calendar: React.FC<ICalendar> = (props) => {
  const [calendarDate, setCalendarDate] = React.useState<any[]>([])
  const dayStr = ['일', '월', '화', '수', '목', '금', '토']

  const drawCalendarHeader = () => {
    return dayStr.map((day, i) => {
      return (
        <DayIndicator key={i} isHoliday={i == 0}>
          {day}
        </DayIndicator>
      )
    })
  }

  const drawCalendarBody = () => {
    return calendarDate.map((date, i) => {
      return <div key={i}>{date}</div>
    })
  }

  const getNewCalendarDate = React.useCallback(() => {
    const newCalendarDate: any[] = []
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
      newCalendarDate.push(date)
    }
    for (let i = 0; i < thisMonthEndDate; i++) {
      const date = i + 1
      newCalendarDate.push(date)
    }
    const neededCellCnt = 42 - newCalendarDate.length

    for (let i = 0; i < neededCellCnt; i++) {
      const date = i + 1
      newCalendarDate.push(date)
    }
    return newCalendarDate
  }, [props.date])

  React.useEffect(() => {
    setCalendarDate((prev) => [...getNewCalendarDate()])
  }, [props.date])

  return (
    <div>
      <CalendarHeader>{drawCalendarHeader()}</CalendarHeader>
      {drawCalendarBody()}
    </div>
  )
}

export default Calendar
