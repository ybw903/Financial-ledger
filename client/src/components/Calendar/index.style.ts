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
