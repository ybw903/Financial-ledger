import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import Calendar from './components/Calendar'
import HeaderBar from './components/HeaderBar'
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

function App() {
  const [date, setDate] = useState(new Date())
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
          <div>
            <div>제목</div>
            <div>글자 버튼</div>
          </div>
          <div>
            <Calendar date={date}></Calendar>
          </div>
          <div>
            <ul>
              <li>날짜 소비1</li>
              <li>날짜 소비2</li>
            </ul>
          </div>
        </Card>
      </Section>
    </Main>
  )
}

export default App
