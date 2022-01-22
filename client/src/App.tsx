import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import Calendar from './components/Calendar'
import HeaderBar from './components/HeaderBar'
import { dayStr } from './utils'
import data from './data/data.json'

const Main = styled.main`
  height: 100%;
  width: 100%;
`
const Header = styled.header`
  width: 100%;
  height: 100px;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 0px 20px;
  font-weight: 600;
  font-size: 21px;
`
const Section = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const Card = styled.div`
  width: 420px;
  border: 1px solid;
  margin: 10px;
  padding: 20px;
`

const SpendTitle = styled.div`
  padding: 10px 0px 10px 10px;
  font-size: 21px;
  font-weight: 600;
  color: gray;
`

const SpendTotal = styled.div`
  padding: 10px 0px 10px 20px;
  font-size: 27px;
  font-weight: 700;
  color: #000;
`
const DailyExpenseHedaer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 14px;
`

const DailyExpenseTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #000;
`
const DailyExpenseTextButton = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: gray;
`

const DailyExpenseList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
`

const DailyExpenseDay = styled.div`
  font-size: 18px;
  font-weight: 18px;
  color: gray;
`

const DailyExpenseElement = styled.div`
  font-size: 21px;
  font-weight: 700;
  color: #000;
`

function App() {
  const [date, setDate] = useState(new Date())
  const [isOpen, setIsOpen] = useState(true)
  const totTalSpend = useMemo(
    () =>
      data.spends
        .filter(
          (spend) =>
            new Date(spend.date).getMonth() === new Date().getMonth() &&
            spend.type === 'EXPENDITURE'
        )
        .reduce((acc, cur, idx) => (acc += cur.money), 0),

    [data]
  )
  const todayAmounts = useMemo(
    () =>
      data.spends.filter((spend) => {
        const spendDate = new Date(spend.date)
        const todayDate = new Date()
        return (
          spendDate.getFullYear() === todayDate.getFullYear() &&
          spendDate.getMonth() === todayDate.getMonth() &&
          spendDate.getDate() === todayDate.getDate()
        )
      }),
    []
  )

  const onClickHandler = (
    evt: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setIsOpen((prev) => !prev)
  }
  return (
    <Main>
      <Header>
        <HeaderBar date={date} />
      </Header>
      <Section>
        <Card>
          <SpendTitle>이번 달 소비</SpendTitle>
          <SpendTotal>{totTalSpend} 원</SpendTotal>
        </Card>
        <Card>
          <DailyExpenseHedaer>
            <DailyExpenseTitle>전체 내역</DailyExpenseTitle>
            <DailyExpenseTextButton onClick={onClickHandler}>
              달력 접기
            </DailyExpenseTextButton>
          </DailyExpenseHedaer>
          <Calendar date={date} isOpen={isOpen}></Calendar>
          <DailyExpenseList>
            <DailyExpenseDay>
              {date.getDate()}일 {dayStr[date.getDay()]}요일
            </DailyExpenseDay>
            {todayAmounts.map((todayAmount, i) => (
              <DailyExpenseElement key={i}>
                {todayAmount.type === 'EXPENDITURE' ? '-' : '+'}
                {todayAmount.money} 원
              </DailyExpenseElement>
            ))}
          </DailyExpenseList>
        </Card>
      </Section>
    </Main>
  )
}

export default App
