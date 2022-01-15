import * as React from 'react'
import { ArrowButton, MonthTitle, PlusButton } from './index.style'
interface IHeaderBar {
  date: Date
}

const HeaderBar: React.FC<IHeaderBar> = (props) => {
  return (
    <>
      <MonthTitle>
        <div>{props.date.getMonth() + 1}월</div>
        <ArrowButton />
      </MonthTitle>
      <div>
        <PlusButton />
        <div>편집 버튼</div>
      </div>
    </>
  )
}

export default HeaderBar
