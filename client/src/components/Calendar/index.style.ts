import styled from 'styled-components'

interface IDayIndicator {
  isHoliday: boolean
}

interface ICalendar {
  isOpen: boolean
}

interface IDateIndicator {
  isInMonth: boolean
}

interface IDateCell {
  isToday: boolean
}

interface ISumIndicator {
  isExpenditure: boolean
}

export const CalendarSection = styled.div<ICalendar>`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  flex-direction: column;
  padding: 34px 22px;
  box-shadow: 0px 5px 50px rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  padding: 34px 22px;
  width: 372px;
  height: calc(372px * 0.9);
`

export const CalendarHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-row-gap: 7px;
  width: 100%;
  height: 55px;
  margin-bottom: 37px;
`
export const DayIndicator = styled.div<IDayIndicator>`
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 600;
  font-size: 17px;
  line-height: 21px;
  text-align: center;
  color: ${(props) => (props.isHoliday ? '#f8123b' : '#333333')};
`

export const CalendarBody = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-column-gap: 7px;
  grid-row-gap: 7px;
  width: 100%;
  height: 85%;
`

export const DateCell = styled.div<IDateCell>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${(props) => (props.isToday ? 'lightgray' : '#f5f5f7')};
  border-radius: 10px;
  padding: 0px 9px 4px 0px;
  width: 100%;
  height: 100%;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  box-sizing: border-box;
  &:hover {
    background-color: lightgray;
  }
`

export const DateIndicator = styled.div<IDateIndicator>`
  position: relative;
  color: ${(props) => (props.isInMonth ? '#333333' : '#bdbdbd')};
  left: 5px;
  top: 5px;
`

export const SumIndicator = styled.div<ISumIndicator>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: ${(props) => (props.isExpenditure ? '#f8123b' : '#166ff3')};
`
