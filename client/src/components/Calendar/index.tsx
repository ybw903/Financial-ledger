import * as React from 'react';
interface ICalendar {
    month : number
}

const Calendar:React.FC<ICalendar> = (props) => {

    const dayStr = ['일','월','화','수','목','금','토'];

    const drawCalendarHeader = () => {
        return dayStr.map((day) => {
            return (
                <div>{day}</div>
            )
        }, '')
    }

    return (
        <div>
            {drawCalendarHeader()}
        </div>
    )
}

export default Calendar;