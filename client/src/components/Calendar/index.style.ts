import styled from 'styled-components'

interface IDayIndicator {
  isHoliday: boolean
}

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

export const DateCell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f5f5f7;
  border-radius: 10px;
  padding: 0px 9px 4px 0px;
  width: 100%;
  height: 100%;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
`
