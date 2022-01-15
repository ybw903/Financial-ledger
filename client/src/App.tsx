import React, { useState } from 'react'
import styled from 'styled-components'
import Calendar from './components/Calendar'
import HeaderBar from './components/HeaderBar'

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

function App() {
  const [date, setDate] = useState(new Date())
  return (
    <Main>
      <Header>
        <HeaderBar date={date} />
      </Header>
      <Section>
        <Card>
          <div>
            <div>이번 달 소비</div>
          </div>
          <div>
            <div>소비 금액</div>
          </div>
          <ul>
            <li>소비내용 1</li>
            <li>소비내용 2</li>
          </ul>
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
